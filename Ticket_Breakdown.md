# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here


Ticket 1

    - TASK:
      - Update schema of database to include new column `custom_agent_id`. The new column should have a unique constraint.
      
    - ACCEPTANCE CRITERION:
      - Nullable (if optional) varchar custom_agent_id column should be included in Agent's table.
      
    - IMPLEMENTATION DETAILS:
      - As a facility I should have an ability to save a custom id for each agent, so that when the report is generated I can match the customId with the internal records, This will require database migration.
      
    - STORY POINT/ESTIMATION: 1 Hour

Ticket 2

    - TASK:
      - Add input where facilities can enter custom agent id for each agent
      
    - ACCEPTANCE CRITERION:
      - Input field to accept the alphanumeric values for custom agent id
      - After user enters the values and clicks on SAVE, the custom agent id should be saved in the database
      
    - IMPLEMENTATION DETAILS:
      - Input field in the UI with an ability to enter alphanumeric valued for custom agent id.
      
    - STORY POINT/ESTIMATION: 6 Hours

Ticket 3

    - TASK:
      - Update method `getShiftsByfacility` to include custom Id.
      
    - ACCEPTANCE CRITERION:
      - getShiftsByFacility should include the custom agent id on agent object.
      
    - IMPLEMENTATION DETAILS:
      - Refactor existing function in a way when it's called for generating reports, we have to include the custom id entered by the facility of any particular agent.
      
    - STORY POINT/ESTIMATION: 4 Hours

Ticket 4

    - TASK: 
      - Update `generateReport` to include custom agent id on it's return value
      
    - ACCEPTANCE CRITERION:
      - generateReport should have custom agent id on each agent
      - generated PDF should show the custom id for each agent.
      
    - IMPLEMENTATION DETAILS:
      - Refactor existing generateReport method to include the shift and agent metadata information while generating the report.
      
    - STORY POINT/ESTIMATION: 4 Hours
