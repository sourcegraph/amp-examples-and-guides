import { execute, type AmpOptions } from '@sourcegraph/amp-sdk'

const JIRA_TO_REPO: Record<string, string> = { 	'KAN': 'https://github.com/Isuru-F/demo-latest-audiobooks/'}

function getRepoFromJiraTicket(ticketNumber: string): string {
	const prefix = ticketNumber.split('-')[0]
	const repo = JIRA_TO_REPO[prefix]
	if (!repo) throw new Error(`No repository mapping found for JIRA prefix: ${prefix}`)
	return repo
}
const getCurrentDateTime = () => new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)
async function main() {
	const jiraTicket = process.argv[2]
	if (!jiraTicket) {
		console.error('Error: JIRA ticket number is required\nUsage: npx tsx execute-agent.ts KAN-123')
		process.exit(1)
	}

	const repoUrl = getRepoFromJiraTicket(jiraTicket)
	const branchName = `${jiraTicket}-${getCurrentDateTime()}`
	console.log(`Processing: ${jiraTicket}\nRepository: ${repoUrl}\nBranch: ${branchName}`)
	const prompt = `Using the gh CLI, complete the following workflow:
1. Clone the repository ${repoUrl} into the ./repos folder if it doesn't exist already
2. Fetch the JIRA issue details for ${jiraTicket} (use the jira_tool) and set the status to IN PROGRESS
3. Navigate to the cloned repository and Create a git worktree in a new directory within ./repos with branch name: ${branchName}
4. Implement the solution for the JIRA issue ${jiraTicket} in the worktree/ branch
5. Make sure the project builds and the tests are passing.
6. Commit your changes with a meaningful commit message referencing ${jiraTicket}
7. Push the branch to the remote repository
8. Create a pull request using gh CLI with a title and description based on the JIRA issue
9. Update the Jira Ticket status to "In Review" 
10. Update the Jira Ticket with a comment with the a link to the PR and a summary of what was completed. Add a link to the amp thread https://ampcode.com/threads/[message.session_id] it should look like https://ampcode.com/threads/T-someguid
Make sure to handle errors gracefully and provide status updates at each step.`

	const messages = execute({ prompt, options: { dangerouslyAllowAll : true, toolbox: '/toolbox'	} })
	for await (const message of messages) {
		if (message.type === 'system') {
			console.log(`Started thread: ${message.session_id} view at https://ampcode.com/threads/${message.session_id}`)
		} else if (message.type === 'assistant' && message.message.content[0].type === "text") {
			console.log(message.message.content[0].text)
		} else if (message.type === 'result') {
			message.is_error 
				? console.error('Execution failed:', message.error)
				: console.log('Execution completed successfully\nResult:', message.result)
		}
	}
}
main().catch(console.error)