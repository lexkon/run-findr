# Run Findr

## Features

- **Browse future runs:** View a list of upcoming running events with details like distance, date, time, and location
- **User accounts:** Users can sign up for events and view their signups on their account page
- **Calendar:** After signing up to a run, users can download an ICS of the event details to add to their calendar
- **Staff controls:** Staff members can create new runs and update and delete current runs


## Tech Stack
* Nextjs
* Tailwind
* Supabase (Auth & Database)


## Clone/Fork Instructions
```sh
git clone https://github.com/your-username/run-findr.git
cd run-findr
```

Install Dependencies
```sh
npm install
```

## Supabase Setup
1. Create a Supabase project
2. Set up the following tables:
    * `users` (with fields: `id`, `display_name`, `is_staff`)
    * `running_events` (with fields: `id`, `event_name`, `description`, `distance`, `event_date`, `event_time`, `location`, `image_url`)
    * `signups` table (with fields: `id`, `user_id`, `running_event_id`) 
3. Make sure [RLS](https://supabase.com/docs/guides/database/postgres/row-level-security) is enabled and any policies you want are enacted 

## Environment Variables
Create your Supabase project and add the variables to a `.env` file in the root directory
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Run the App
```sh
npm run dev
```
Nextjs should be running and you can visit [http://localhost:3000](http://localhost:3000) to view the app

---
> ## Project Overview
> A small community business has reached out to you to create a platform where they can create and share events with members of the community.
You have been tasked with building and hosting a platform (web app or progressive web app) that allows community members to view, sign up for, and add events to their own personal calendars. Staff members should have additional functionality to create and manage events.
> 
> ## Minimum Viable Product (MVP)
> Your platform must fulfil the following functionality:
> 1. Display a list of events for users to browse.
> 2. Allow users to sign up for an event.
> 3. Allow users to add events to their Calendar after signing up.
> 4. Enable staff members to sign-in to create and manage events.
