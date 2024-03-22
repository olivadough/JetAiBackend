
# Before Running
1) Make sure to create a secret key from OpenAi
2) Save the secret key from OpenAi as JET_AI_SECRET in the .env file
Utilizes Model gpt-3.5-turbo-0125
# How to get the server running
1) Go to oliver_jet_ai_backend in the terminal
2) press "yarn" in the terminal to install required packages
3) Enter in the terminal "yarn run build"
4) Enter in the terminal "yarn start"
Voila! Your app should be running on "http://localhost:3000/"
5) Go to "http://localhost:3000/" and have fun!

# To checkout or manipulate the database using prisma web app
1) Type in “npx prisma studio” into the terminal

# To test out functionality for prisma
1) Edit script.ts
2) After being content with it, Use npx ts-node script.ts to execute the functions

# To Test out Api Endpoints
1) You can use the json file in the postman collection!

# To test out functionality for openAi
Utilizes Model gpt-3.5-turbo-0125
1) Edit script_openai.ts
2) After being content with it, Use npx ts-node script_openai.ts to execute the functions

# When Testing route
1) nodemon --exec "next" dev, this will allow for fast restart of the server especially with any new changes added