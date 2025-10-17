#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const action = process.env.TOOLBOX_ACTION;

interface JiraConfig {
  JIRA_BASE_URL: string;
  JIRA_EMAIL: string;
  JIRA_API_TOKEN: string;
}

function loadJiraConfig(): JiraConfig {
  const envPath = path.join(process.cwd(), 'jira.env');
  
  if (!fs.existsSync(envPath)) {
    throw new Error('jira.env file not found. Please create it with JIRA_BASE_URL, JIRA_EMAIL, and JIRA_API_TOKEN');
  }

  const envContent = fs.readFileSync(envPath, 'utf-8');
  const config: any = {};
  
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      config[key.trim()] = valueParts.join('=').trim();
    }
  });

  if (!config.JIRA_BASE_URL || !config.JIRA_EMAIL || !config.JIRA_API_TOKEN) {
    throw new Error('Missing required configuration in jira.env');
  }

  return config as JiraConfig;
}

async function getJiraTicket(ticketKey: string, config: JiraConfig): Promise<any> {
  const auth = Buffer.from(`${config.JIRA_EMAIL}:${config.JIRA_API_TOKEN}`).toString('base64');
  
  const response = await fetch(`${config.JIRA_BASE_URL}/rest/api/3/issue/${ticketKey}`, {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch JIRA ticket: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

async function updateJiraStatus(ticketKey: string, transitionName: string, config: JiraConfig): Promise<any> {
  const auth = Buffer.from(`${config.JIRA_EMAIL}:${config.JIRA_API_TOKEN}`).toString('base64');
  
  const transitionsResponse = await fetch(
    `${config.JIRA_BASE_URL}/rest/api/3/issue/${ticketKey}/transitions`,
    {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Accept': 'application/json'
      }
    }
  );

  if (!transitionsResponse.ok) {
    throw new Error(`Failed to fetch transitions: ${transitionsResponse.status}`);
  }

  const transitions = await transitionsResponse.json();
  const transition = transitions.transitions.find(
    (t: any) => t.name.toLowerCase() === transitionName.toLowerCase()
  );

  if (!transition) {
    const available = transitions.transitions.map((t: any) => t.name).join(', ');
    throw new Error(`Transition '${transitionName}' not found. Available: ${available}`);
  }

  const updateResponse = await fetch(
    `${config.JIRA_BASE_URL}/rest/api/3/issue/${ticketKey}/transitions`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        transition: {
          id: transition.id
        }
      })
    }
  );

  if (!updateResponse.ok) {
    throw new Error(`Failed to update status: ${updateResponse.status}`);
  }

  return { success: true, transition: transition.name };
}

async function addJiraComment(ticketKey: string, comment: string, config: JiraConfig): Promise<any> {
  const auth = Buffer.from(`${config.JIRA_EMAIL}:${config.JIRA_API_TOKEN}`).toString('base64');
  
  const response = await fetch(
    `${config.JIRA_BASE_URL}/rest/api/3/issue/${ticketKey}/comment`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        body: {
          type: 'doc',
          version: 1,
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: comment
                }
              ]
            }
          ]
        }
      })
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to add comment: ${response.status}`);
  }

  return { success: true, message: 'Comment added successfully' };
}

if (action === 'describe') {
  console.log(JSON.stringify({
    name: 'jira_tool',
    description: 'Interact with JIRA tickets: fetch ticket details, update ticket status, or add comments. Requires jira.env file with credentials.',
    args: {
      operation: ['string', 'Operation to perform: "get" to fetch ticket details, "update_status" to change ticket status, "add_comment" to add a comment'],
      ticket_key: ['string', 'JIRA ticket key (e.g., "IMTP-123")'],
      status: ['string', 'Optional: New status name for update_status operation (e.g., "In Progress", "Done")'],
      comment: ['string', 'Optional: Comment text for add_comment operation']
    }
  }));
} else if (action === 'execute') {
  (async () => {
    try {
      const args = JSON.parse(fs.readFileSync(0, 'utf-8'));
      
      if (!args.operation) {
        throw new Error('Missing required argument: operation');
      }
      
      if (!args.ticket_key) {
        throw new Error('Missing required argument: ticket_key');
      }

      const config = loadJiraConfig();

      if (args.operation === 'get') {
        const ticket = await getJiraTicket(args.ticket_key, config);
        const summary = {
          key: ticket.key,
          summary: ticket.fields.summary,
          description: ticket.fields.description,
          status: ticket.fields.status.name,
          assignee: ticket.fields.assignee?.displayName || 'Unassigned',
          priority: ticket.fields.priority?.name || 'None',
          type: ticket.fields.issuetype.name
        };
        
        console.log(JSON.stringify({ success: true, ticket: summary }));
      } else if (args.operation === 'update_status') {
        if (!args.status) {
          throw new Error('Missing required argument: status (for update_status operation)');
        }
        
        const result = await updateJiraStatus(args.ticket_key, args.status, config);
        console.log(JSON.stringify({ success: true, message: `Updated ${args.ticket_key} to ${result.transition}` }));
      } else if (args.operation === 'add_comment') {
        if (!args.comment) {
          throw new Error('Missing required argument: comment (for add_comment operation)');
        }
        
        const result = await addJiraComment(args.ticket_key, args.comment, config);
        console.log(JSON.stringify({ success: true, message: result.message }));
      } else {
        throw new Error(`Unknown operation: ${args.operation}. Use "get", "update_status", or "add_comment"`);
      }
    } catch (error) {
      console.error('JIRA tool error:', error.message);
      console.log(JSON.stringify({ success: false, error: error.message }));
    }
  })();
}
