# README

Unfortunately I couldn't get this project to start, the original version of Rails was 4.6.2 and I foolishly tried to upgrade it to 5.1. This was during the strange transitional period where Rails was starting to allow React front-end applications, so it's very hard to tell which changes I needed to make on either end to get this to work. In any case, I could probably start over if need be, using the latest Rails, given that I believe it's become increasingly easier to start React projects, or alternatively I could just create a Rails API app and leave the front-end solely to Node.

By going into app > javascript you'll be able to find the React components for each portion of the site. The mapFeature was a map that displayed dots for drivers that it was tracking using the React Native app I created (old-driver). If you notice by the other folders, it was done using Redux, again at that time it was a very popular design pattern.

On the Rails back-end portion, I used rolify to allow the creation of different roles that give users access to different parts of the app depending on the role.

Finally, I started working on what an assignment for a driver was, this would've ultimately been the creation of a load. I started thinking about load creation and some of the pain points when dealing with the existing software we were using. These include:

* Place data integrity
	...Too many times locations were duplicated in the database causing confusion. My solution was to use a service like Google to gain unique place id's. Of course one of the problems with this method is if the location is new or unknown to Google, which is surprisingly common in the trucking/logistics industry. Another solution would be to do a background search and alert the user of a potentially  similar location.

* Load data entry flow
	...Different software asked to input different data before other fields were made available. This leads to making up incorrect data just to be able to circumvent this restriction. A better solution is to consider what is the minimum amount of data that should be required, and at some point restrict the load from being processed unto the next step (invoicing, bol collection, etc.). This could also be taught to the user via helpful warning messages.

* Load tracking log
	...Certain TMS's allowed us to keep a manual log of "updates" while some relied on "status", ie. assigned, enroute, etc. Having the intention of eventually using the tracking driver app, I felt a combination of these two would've been ideal, one detailed log for internal purposes and one meant for customers.