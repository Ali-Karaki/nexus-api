<details>
<summary>
chatgpt promp for data gen
</summary>

for "creator" and "collaborators" use "ids" array
for "name" and "description" use a random project name
for "keywords" use keywords array
for "researchFields" use researchFields array
for "status" use one from status array
for "sponsors" use 1 or 2 from sponsors array
for "geographicScope" use one from geographicScope array
for "participantsAge" use 1 or 2 from participantsAge array
for "goals" create 1 or 2 goals
for "participationTasks" use some element from participationTasks
for "email" use one from emails array
for "startDate" and "createdAt" and "updatedAt" they're of type Date, use random Date

ids: ["651db18215be300c97adcafa","651c66942574e9ebd849127a","651c64876e82d22911542860"]

emails: ["test@test.com","Khellowz@gmail.com","badrahsein@gmail.com"]

keywords: ['skywarn','weather','flood','tornado','thunderstorm','typhoon','snow','ice','wind','damage','storm','noaa','nws','training','meteorology','water quality','dissolved oxygen','salinity']

researchFields: ['climate and weather','chemistry','ecology and environment','nature and outdoors','ocean/water and marine','animals','ecology and environment','astronomy and space','birds','computers and technology','disaster response','geology and earth science','geography','climate and weather','computers and technology','ocean/water and marine','science policy','geology and earth science','biology','health and medicine']

participantsAge: ['seniors','families','elementary school children','teens','targeted group','adults','middle school children','other','general public',]

participationTasks: ['audio video recording','identification','learning','measurement','observation','photography','sample analysis','site selection description','specimen sample collection','data entry','annotation','classification tagging','finding entities','geolocation',]

status: ['active','active_seasonal','inactive','completed','hiatus','pending',]

sponsors: ['NOAA','US','EPA','NASA','BLM','USFS','USGS','NSF','NPS','SI','DOI','NARA']

geographicScope: ['national','florida','alaska','international','world','georgia','u.s.','antarctic peninsula','idaho','rocky mountain national park','global']

</details>

<details>
<summary>
Example projects / sample data
</summary>
[
{
"creator": "651db18215be300c97adcafa",
"collaborators": ["651c66942574e9ebd849127a"],
"name": "Project Alpha",
"description": "A research on climatic conditions.",
"keywords": ["skywarn", "weather", "flood"],
"researchFields": ["climate and weather", "chemistry"],
"status": "active",
"sponsors": ["NOAA", "US"],
"geographicScope": "national",
"participantsAge": ["seniors", "families"],
"goals": ["Improve weather prediction", "Study flood impacts"],
"participationTasks": ["audio video recording", "observation"],
"email": "test@test.com",
"startDate": "2023-05-05T12:00:00.000Z",
"createdAt": "2023-05-01T12:00:00.000Z",
"updatedAt": "2023-05-10T12:00:00.000Z"
},
{
"creator": "651c66942574e9ebd849127a",
"collaborators": ["651c64876e82d22911542860"],
"name": "Project Beta",
"description": "Exploration of marine life.",
"keywords": ["snow", "water quality", "salinity"],
"researchFields": ["ocean/water and marine", "animals"],
"status": "completed",
"sponsors": ["EPA"],
"geographicScope": "international",
"participantsAge": ["teens", "adults"],
"goals": ["Document marine species", "Study water quality"],
"participationTasks": ["measurement", "sample analysis"],
"email": "Khellowz@gmail.com",
"startDate": "2023-03-10T12:00:00.000Z",
"createdAt": "2023-03-01T12:00:00.000Z",
"updatedAt": "2023-03-15T12:00:00.000Z"
},
{
"creator": "651db18215be300c97adcafa",
"collaborators": ["651c64876e82d22911542860", "651c66942574e9ebd849127a"],
"name": "Project Delta",
"description": "Space exploration initiative",
"keywords": ["tornado", "thunderstorm", "typhoon"],
"researchFields": ["astronomy and space", "biology"],
"status": "hiatus",
"sponsors": ["NPS", "SI"],
"geographicScope": "global",
"participantsAge": ["general public"],
"goals": ["Discover new galaxies", "Study black holes"],
"participationTasks": ["annotation", "finding entities"],
"email": "test@test.com",
"startDate": "2023-01-01T12:00:00.000Z"
},
{
"creator": "651c64876e82d22911542860",
"collaborators": ["651db18215be300c97adcafa"],
"name": "Project Epsilon",
"description": "Exploring the depths of the ocean.",
"keywords": ["ice", "wind", "damage"],
"researchFields": ["ocean/water and marine", "ecology and environment"],
"status": "active_seasonal",
"sponsors": ["EPA", "NOAA"],
"geographicScope": "florida",
"participantsAge": ["families", "seniors"],
"goals": ["Document underwater species", "Explore coral reefs"],
"participationTasks": ["photography", "observation"],
"email": "Khellowz@gmail.com",
"startDate": "2023-02-15T12:00:00.000Z"
},
{
"creator": "651c64876e82d22911542860",
"collaborators": ["651db18215be300c97adcafa"],
"name": "Project Gamma",
"description": "Understanding geology.",
"keywords": ["meteorology", "nws", "noaa"],
"researchFields": ["geology and earth science", "geography"],
"status": "pending",
"sponsors": ["NASA", "USGS"],
"geographicScope": "rocky mountain national park",
"participantsAge": ["middle school children", "other"],
"goals": ["Analyze soil components", "Map geographical terrains"],
"participationTasks": ["site selection description", "data entry"],
"email": "badrahsein@gmail.com",
"startDate": "2023-04-20T12:00:00.000Z"
}
]

</details>
