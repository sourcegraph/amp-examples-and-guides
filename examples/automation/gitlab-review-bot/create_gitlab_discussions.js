#!/usr/bin/env node

const fs = require('fs');
const crypto = require('crypto');

// Ensure fetch is available (Node 18+ has it globally, but add fallback)
if (typeof globalThis.fetch === 'undefined') {
  const { default: fetch } = require('node-fetch');
  globalThis.fetch = fetch;
}

// GitLab API configuration
const GITLAB_TOKEN = process.env.GITLAB_TOKEN || process.env.CI_JOB_TOKEN;
const PROJECT_ID = process.env.CI_PROJECT_ID;
const MR_IID = process.env.CI_MERGE_REQUEST_IID;
const API_BASE = process.env.CI_API_V4_URL || 'https://gitlab.com/api/v4';

if (!GITLAB_TOKEN || !PROJECT_ID || !MR_IID) {
  console.error('Missing required environment variables');
  process.exit(1);
}

// Utility function to make GitLab API requests
async function gitlabRequest(endpoint, method = 'GET', data = null) {
  const url = `${API_BASE}${endpoint}`;
  const options = {
    method,
    headers: {
      'PRIVATE-TOKEN': GITLAB_TOKEN,
      'Content-Type': 'application/json'
    }
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`GitLab API error: ${response.status} ${response.statusText} - ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error.message);
    throw error;
  }
}

// Function to calculate SHA1 hash of a filename (required for line_code)
function calculateSHA1(filename) {
  return crypto.createHash('sha1').update(filename).digest('hex');
}

// Function to parse diff and create file/line mappings
function parseDiffFiles(diffContent) {
  const files = {};
  const lines = diffContent.split('\n');
  let currentFile = null;
  let oldLineNum = 0;
  let newLineNum = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Match file headers: diff --git a/file b/file
    const fileMatch = line.match(/^diff --git a\/(.+) b\/(.+)$/);
    if (fileMatch) {
      currentFile = fileMatch[2]; // Use the 'b' version (new file)
      files[currentFile] = {
        oldPath: fileMatch[1],
        newPath: fileMatch[2],
        lineMap: {}, // maps new line numbers to old line numbers
        hasChanges: false,
        fileSHA: calculateSHA1(currentFile)
      };
      continue;
    }

    // Skip index and file mode lines
    if (line.startsWith('index ') || line.startsWith('new file') || 
        line.startsWith('deleted file') || line.startsWith('--- ') || 
        line.startsWith('+++ ')) {
      continue;
    }

    // Match hunk headers: @@ -oldStart,oldCount +newStart,newCount @@
    const hunkMatch = line.match(/^@@ -(\d+),?\d* \+(\d+),?\d* @@/);
    if (hunkMatch && currentFile) {
      oldLineNum = parseInt(hunkMatch[1]);
      newLineNum = parseInt(hunkMatch[2]);
      continue;
    }

    // Track line numbers for mapping
    if (currentFile && (line.startsWith('+') || line.startsWith('-') || line.startsWith(' '))) {
      if (line.startsWith('+') && !line.startsWith('+++')) {
        // New line added - this can be commented on
        files[currentFile].lineMap[newLineNum] = {
          type: 'added',
          oldLine: null,
          newLine: newLineNum,
          lineCode: `${files[currentFile].fileSHA}_${oldLineNum}_${newLineNum}`
        };
        files[currentFile].hasChanges = true;
        newLineNum++;
      } else if (line.startsWith('-') && !line.startsWith('---')) {
        // Line removed - can be commented on
        files[currentFile].lineMap[`${oldLineNum}_deleted`] = {
          type: 'deleted',
          oldLine: oldLineNum,
          newLine: null,
          lineCode: `${files[currentFile].fileSHA}_${oldLineNum}_${newLineNum}`
        };
        files[currentFile].hasChanges = true;
        oldLineNum++;
      } else if (line.startsWith(' ')) {
        // Context line (unchanged) - can be commented on
        files[currentFile].lineMap[newLineNum] = {
          type: 'context',
          oldLine: oldLineNum,
          newLine: newLineNum,
          lineCode: `${files[currentFile].fileSHA}_${oldLineNum}_${newLineNum}`
        };
        oldLineNum++;
        newLineNum++;
      }
    }
  }

  return files;
}

// Function to parse AMP review output for issues with file/line information
function parseReviewIssues(content) {
  const issues = [];
  const lines = content.split('\n');
  let currentIssue = null;

  console.log('Parsing review content for issues...');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Match issue headers: "1. **🔴 HIGH - Title**"
    const issueMatch = line.match(/^(\d+)\.\s+\*\*([🔴🟡🟢])?\s*(HIGH|MEDIUM|LOW)?\s*-?\s*(.+?)\*\*\s*$/);
    if (issueMatch) {
      // Save previous issue
      if (currentIssue && currentIssue.file && currentIssue.line) {
        issues.push(currentIssue);
      }

      const [, number, emoji, priorityText, title] = issueMatch;
      let priority = '🟡 MEDIUM';
      if (priorityText === 'HIGH' || emoji === '🔴') {
        priority = '🔴 HIGH';
      } else if (priorityText === 'LOW' || emoji === '🟢') {
        priority = '🟢 LOW';
      }

      currentIssue = {
        number: parseInt(number),
        title: title.trim(),
        priority: priority,
        file: null,
        line: null,
        description: '',
        suggestion: ''
      };

      console.log(`Found issue #${number} (${priority}): ${title.trim()}`);
      continue;
    }

    // Parse issue details
    if (currentIssue) {
      const fileMatch = line.match(/^-\s*FILE:\s*(.+)$/i);
      const lineMatch = line.match(/^-\s*LINE:\s*(\d+)$/i);
      const descMatch = line.match(/^-\s*DESCRIPTION:\s*(.+)$/i);
      const suggMatch = line.match(/^-\s*SUGGESTION:\s*(.+)$/i);

      if (fileMatch) {
        currentIssue.file = fileMatch[1].trim();
      } else if (lineMatch) {
        currentIssue.line = parseInt(lineMatch[1]);
      } else if (descMatch) {
        currentIssue.description = descMatch[1].trim();
      } else if (suggMatch) {
        currentIssue.suggestion = suggMatch[1].trim();
      }
    }
  }

  // Add final issue
  if (currentIssue && currentIssue.file && currentIssue.line) {
    issues.push(currentIssue);
  }

  console.log(`Parsed ${issues.length} issues with file/line info`);
  return issues.filter(issue => issue.file && issue.line);
}

// Main function to create GitLab discussions
async function createGitLabDiscussions() {
  try {
    console.log('Starting GitLab discussions creation...');

    // Read files
    const diffContent = fs.readFileSync('mr_diff.txt', 'utf8');
    const reviewContent = fs.readFileSync('amp_review.txt', 'utf8');

    // Parse diff and review
    const diffFiles = parseDiffFiles(diffContent);
    const issues = parseReviewIssues(reviewContent);

    console.log(`Found ${issues.length} issues to process`);
    console.log(`Parsed ${Object.keys(diffFiles).length} files from diff`);

    // Get MR data for SHA information
    const mrData = await gitlabRequest(`/projects/${PROJECT_ID}/merge_requests/${MR_IID}`);
    const baseSHA = mrData.diff_refs.base_sha;
    const headSHA = mrData.diff_refs.head_sha;
    const startSHA = mrData.diff_refs.start_sha;

    console.log(`MR SHAs - Base: ${baseSHA}, Head: ${headSHA}, Start: ${startSHA}`);

    // Clean up existing AMP review discussions
    try {
      const existingDiscussions = await gitlabRequest(`/projects/${PROJECT_ID}/merge_requests/${MR_IID}/discussions`);
      
      for (const discussion of existingDiscussions) {
        if (discussion.notes && discussion.notes.length > 0) {
          const firstNote = discussion.notes[0];
          if (firstNote.body && firstNote.body.includes('🤖 AMP Code Review')) {
            try {
              // Try to resolve the discussion to mark it as outdated
              await gitlabRequest(
                `/projects/${PROJECT_ID}/merge_requests/${MR_IID}/discussions/${discussion.id}`,
                'PUT',
                { resolved: true }
              );
              console.log(`Resolved existing AMP discussion: ${discussion.id}`);
            } catch (resolveError) {
              console.log(`Could not resolve discussion ${discussion.id}:`, resolveError.message);
            }
          }
        }
      }
    } catch (error) {
      console.log('Note: Could not clean up existing discussions:', error.message);
    }

    // Create inline discussions for each issue
    const createdDiscussions = [];
    
    for (const issue of issues) {
      const fileData = diffFiles[issue.file];
      
      if (!fileData) {
        console.log(`Skipping issue for file not in diff: ${issue.file}`);
        continue;
      }

      // Find the line mapping for the issue
      let lineMapping = fileData.lineMap[issue.line];
      
      // If exact line not found, try to find closest line with changes
      if (!lineMapping) {
        let closestLine = null;
        let minDistance = Infinity;
        
        for (const [lineKey, lineData] of Object.entries(fileData.lineMap)) {
          if (lineKey.includes('_deleted')) continue;
          const lineNum = parseInt(lineKey);
          const distance = Math.abs(lineNum - issue.line);
          if (distance < minDistance && lineData.type !== 'context') {
            minDistance = distance;
            closestLine = lineNum;
            lineMapping = lineData;
          }
        }
        
        if (lineMapping) {
          console.log(`Using closest line ${closestLine} for issue at line ${issue.line} in ${issue.file}`);
        }
      }

      if (!lineMapping) {
        console.log(`Could not find line mapping for ${issue.file}:${issue.line}`);
        continue;
      }

      // Prepare the discussion body
      const discussionBody = `**${issue.priority} - ${issue.title}**

${issue.description}

${issue.suggestion ? `**Suggestion:** ${issue.suggestion}` : ''}

---
*🤖 Generated by AMP Code Review Bot*`;

      // Prepare position data for the discussion
      const positionData = {
        base_sha: baseSHA,
        start_sha: startSHA,
        head_sha: headSHA,
        position_type: 'text',
        old_path: fileData.oldPath,
        new_path: fileData.newPath
      };

      // Add line information based on line type
      if (lineMapping.type === 'added') {
        positionData.new_line = lineMapping.newLine;
      } else if (lineMapping.type === 'deleted') {
        positionData.old_line = lineMapping.oldLine;
      } else {
        // Context line - include both
        positionData.old_line = lineMapping.oldLine;
        positionData.new_line = lineMapping.newLine;
      }

      try {
        console.log(`Creating discussion for ${issue.file}:${issue.line}`);
        console.log('Position data:', JSON.stringify(positionData, null, 2));
        
        const discussion = await gitlabRequest(
          `/projects/${PROJECT_ID}/merge_requests/${MR_IID}/discussions`,
          'POST',
          {
            body: discussionBody,
            position: positionData
          }
        );

        createdDiscussions.push({
          id: discussion.id,
          title: issue.title,
          priority: issue.priority,
          file: issue.file,
          line: issue.line
        });

        console.log(`Created discussion ${discussion.id} for ${issue.file}:${issue.line}`);
      } catch (error) {
        console.error(`Error creating discussion for ${issue.file}:${issue.line}:`, error.message);
        
        // Try creating a general discussion if inline fails
        try {
          const generalBody = `**${issue.priority} - ${issue.title}** (${issue.file}:${issue.line})

${issue.description}

${issue.suggestion ? `**Suggestion:** ${issue.suggestion}` : ''}

*Note: Could not create inline comment, posting as general discussion.*

---
*🤖 Generated by AMP Code Review Bot*`;

          const generalDiscussion = await gitlabRequest(
            `/projects/${PROJECT_ID}/merge_requests/${MR_IID}/discussions`,
            'POST',
            { body: generalBody }
          );

          console.log(`Created general discussion ${generalDiscussion.id} for ${issue.file}:${issue.line}`);
        } catch (fallbackError) {
          console.error(`Failed to create fallback discussion:`, fallbackError.message);
        }
      }
    }

    // Create summary discussion
    const summaryBody = `## 🤖 AMP Code Review

Found **${issues.length}** issues that need attention. ${createdDiscussions.length > 0 ? 'See inline comments for details.' : ''}

**Issues Summary:**
${issues.map((issue, index) => 
  `${index + 1}. ${issue.priority} - ${issue.title} (${issue.file}:${issue.line})`
).join('\n')}

**Next Steps:**
- Address each issue marked in the code
- Resolve discussions when issues are fixed
- Re-request review when all issues are addressed

---
*Review completed on ${new Date().toISOString().split('T')[0]}*`;

    try {
      await gitlabRequest(
        `/projects/${PROJECT_ID}/merge_requests/${MR_IID}/discussions`,
        'POST',
        { body: summaryBody }
      );
      console.log('Created summary discussion');
    } catch (error) {
      console.error('Error creating summary discussion:', error.message);
    }

    console.log(`\nReview completed! Created ${createdDiscussions.length} inline discussions out of ${issues.length} issues.`);

  } catch (error) {
    console.error('Error in main process:', error);
    process.exit(1);
  }
}

// Run the main function
createGitLabDiscussions().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
