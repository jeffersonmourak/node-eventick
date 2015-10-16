# node-eventick
![Build](https://api.travis-ci.org/jeffersonmourak/node-eventick.svg?branch=master "Build")
![Eventick Logo](http://aceleratech.com.br/wp-content/uploads/2013/10/eventick1.png "Eventick Logo")

node-eventick is a wrapper for Public API of Eventick

## instalation

To install, you just need the NPM, using...

``` npm install node-eventick ```

##Usage
to use, you need to call the class Eventick, to do this, use.

``` var Eventick = require('node-eventick'); ``` then...

``` var eventick = new Eventick('email@email.com','password'); ```

### Events

To list all events, you just use

``` eventick.events.list() ```

this will return a array with all information about the events, like this.

```
[ 
	{ 
		id: 20533,
       	title: 'API EVENT TEST',
       	venue: null,
       	slug: 'api-event-test',
       	start_at: '2015-11-30 20:44:00 -0200',
       	theme_color: '00acc1',
       	thumbnail_url: null,
       	links: {
        tickets: [
		        	{
		            	id: 47848,
		            	name: "Ticket Name"
		        	}
		         ]
      } 
    } 
]
	
```

To get the data of just one event, use

``` eventick.events.get(id) ```

this will return a object with all information about the events, like this.

```
{ 
	id: 20533,
   	title: 'API EVENT TEST',
   	venue: null,
   	slug: 'api-event-test',
   	start_at: '2015-11-30 20:44:00 -0200',
   	theme_color: '00acc1',
   	thumbnail_url: null,
   	attendees: class,
   	links: {
    tickets: [
				{
					id: 47848,
					name: "Ticket Name"
				}
	    	 ]
	} 
} 
	
```

### Attendees
If you wanna get a list of the attendees in a event, use.
``` eventick.events.get(id).attendees.list(); ```
but if you has the event id, you can get this list using

``` eventick.attendees.list(event_id); ```

in all options will return the same array with all users, like this

```
[
    {
      "id": 869946,
      "name": "user1",
      "email": "user1@domain.com",
      "code": "DDFHN9ZR",
      "ticket_type": "default",
      "checked_at": null
    },
    {
      "id": 869717,
      "name": "user2",
      "email": "user2@domain.com",
      "code": "YERCYS8B",
      "ticket_type": "default",
      "checked_at": "2015-10-14 23:11:59 -0300"
    },
    {
      "id": 869765,
      "name": "user3",
      "email": "user3@domain.com",
      "code": "PGADPKG9",
      "ticket_type": "default",
      "checked_at": null
    }
  ]

```

to get just one user, use

```
	eventick.events.get(id).attendees.get(user_id);

```
or
```
  eventick.attendees.get(event_id, user_id);

```

and will return a object with all user data
```
{
    "id": 869765,
    "name": "user3",
    "email": "user3@domain.com",
    "code": "PGADPKG9",
    "ticket_type": "default",
    "checked_at": null
}

```

### checkin

to make the checkin in a user, you just call the function checkin when you get the user, look.
```
	eventick.events.get(id).attendees.get(user_id).checkin(time_string);

```

or 

```
  eventick.attendees.get(user_id).checkin(time_string);

```

the ```time_string``` is a ISOstring of Date, if the checkin is right now, you don't need pass the date string as parameter, just keep it void

if you want make the checkin of many attendees, you can use ```check_all()``` function inside attendees, look the example.

```
  eventick.events.get(id).attendees.check_all([id:attendee_id, checked_at: time_string]);

```

or

```
  eventick.attendees.check_all([id:attendee_id, checked_at: time_string]);

```


## Licence
MIT