# Service documentation

In BServices, every service is represented as a **react hook**.  
The hook takes all the parameters it needs and provides an up to date data.  
Every service **returns** an **array** to prevent naming problems but still providing the convinience of shorthands.  

[data, dataOperation]

+ **data** is the data provided by the hook. Note that if any of the parameters is undefined/invalid the data will also be undefined. This behavour can be used for capturing states
+ **dataOperation** is a Function that interacts with the data. Similar to a state maschine takes {type, payload}. Type specifies the operation like "add" or "remove" as string, payload takes 
the context of the operation. TypeScript will help you.


# Brief documentation of all services 

## useAssignSongService
useAssignSongService provides all songs that are assigned to a specific session of a specific band
+ data: Array of songs
+ dataOperation:  
    + type "add": Assigns the payloaded song to the session
    + type "remove": Removes the payloaded song to the session. Only the DatabaseID of the song matters
    

## useBandService
useBandService provides all bands the provided user is a member off.
+ data: Array of bands
+ dataOperation:  
    + type "add": Adds the band specified in the payload. The user will be the leader of the newly created band
    + type "remove": Removes the band specified in the payload. The operation will fail if the user is not the leader of the band. Only the DatabaseID of the matters


## useMemberService
useAssignSongService provides all members of the given band. All operations require the current user to be the leader of the band
+ data: Array of users
+ dataOperation:  
    + type "add": Adds the payloaded user to the band. Only DatabaseID matters. 
    + type "remove": Removes the payloaded user from the band. Only DatabaseID matters.  


## useMemberService
useAssignSongService provides all members of the given band. All operations require the current user to be the leader of the band
+ data: Array of users
+ dataOperation:  
    + type "add": Adds the payloaded user to the band. Only DatabaseID matters. 
    + type "remove": Removes the payloaded user from the band. Only DatabaseID matters. 

## usePersonalService
usePersonalService deals with authentication
+ data: The authetication uid, if the user is logged in
+ dataOperation:  
    + type "signInWithGoogle": Lets the user authenticate with google
    + type "signOut": Signs out the current user
