## Purpose

These examples are provided to:

- Help users understand how to structure an `AGENT.md` file  
- Demonstrate best practices for defining AI agent behavior and persona  
- Serve as inspiration for developing custom agents with Amp  

### Usage

To start, please review [AGENT.md Best Practices Guide](../guides/AGENT.md_Best_Practices.md)


You can copy and adapt these examples for your own agents. If you're working with Amp, place your `AGENT.md` file in the base directory for your workspace and copy/paste content of any of the AGENT.md files in this repo. For other config options see [Amp manual](https://ampcode.com/manual#AGENT.md)

## AGENT.md Examples

This folder contains example `AGENT.md` files used for defining agent personas and behaviors in the Ampsquared project. These examples serve as templates or references for creating and customizing AI agents.


#### [AGENT.md](AGENT.md)
This file contains a general-purpose example of an `AGENT.md` document. It defines a foundational agent with basic configuration, role, tone, and behavioral guidelines. This can be used as a starting point for building more specific agents.

#### [AGENT.md-AmpPersonas](AGENT.md-AmpPersonas)
A persona system for Amp that enables specialised agents for different development tasks.
Based on feedback from teams trialling Amp, this system addresses the need for specialised agents focused on specific tasks like testing, frontend development, and more.

**Features**

- Dynamic Persona Switching: Switch between specialised agent personas on-demand  
- Automatic Context Detection: The system automatically detects when specific expertise is needed based on your prompts. Simply mention relevant keywords or describe tasks, and Amp will switch to the appropriate specialised agent.
- Extensible Agent Library: Easy-to-manage collection of specialised agents  

**Usage**

Switch to a specific persona for the session:

`/persona <agent-name>`

Invoke a persona for a single interaction:

`/as <agent-name> <your-prompt>`

List all available personas:

`/persona list`



<sub>Note: `AGENT.md` is a part of an emerging pattern for agent configuration. For more info see [AGENT.md](https://ampcode.com/AGENT.md)  

