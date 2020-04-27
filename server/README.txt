--------GUIDE TO USE API----------

JWT token needs to be included in the Authorization field of request header as "Bearer [token]"

-----USERS------

1. /api/users/register (POST):
    REQ-BODY: email, password
    CONTENT-TYPE: json
    RETURN DATA: message

2. /api/users/login (POST):
    REQ-BODY: email, password
    CONTENT-TYPE: json
    RETURN DATA: message, token

3. /api/users/profiles (GET):
    QUERY: searchString
    RETURN DATA: users

4. /api/users/profile/:id (GET):  
    RETURN DATA: user

5. /api/users/profile (PUT):
    HEADER: JWT token
    REQ-BODY: [info to be updated: email, password, name, profileImage (FILE), occupation, description]
    CONTENT-TYPE: form-data (if profileImage available)
    RETURN DATA: user [new user info]


-----POSTS------
1. /api/posts/ (GET):
    QUERY_1: pageName, limit, topic
    RETURN DATA _1: posts
    QUERY_2: pageName, pageNum, resPerPage, topic (OPTIONAL), searchString OR isMostRecent
    RETURN DATA _2: posts, totalPage

2. /api/posts/create (POST):
    HEADER: JWT token
    CONTENT-TYPE: form-data
    REQ-BODY: [info to be post: title, subtitle, postImage (FILE), topic, content]
    RETURN DATA: post, message

3. /api/posts/:id (GET):
    RETURN DATA: post

4. /api/posts/:id (PUT):
    HEADER: JWT token
    CONTENT-TYPE: form-data (if profileImage available)
    REQ-BODY: [info to be updated: title, subtitle, postImage (FILE), topic, content]
    RETURN DATA: post, message

5. /api/posts/:id (DELETE):
    HEADER: JWT token
    RETURN DATA: message


-----COMMENTS------
1. /api/comments/ (GET):
    QUERY: postId
    RETURN DATA: comments

-----IMAGE--------
1. /api/uploads/:fileUrl (GET):
    RETURN DATA: [image file]


----------------------------------
----------------------------------
FUTURE UPDATES:
1. Change CommentModel so that other users can reply to comments
2. OAuth
3. Socket.io for comments: users can post comment/change/delete it
4. Logout functionality