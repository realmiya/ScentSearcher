# scentsearcher
The backends are already deployed to AWS and all URLs for RESTful APIs in the frontend are set.

To run this application, 
‘’‘
step1: pull the code of frontEnd filefolder, then cd [frontEnd] directory and;

step2: run 'npm install';

step3: if you are willing to run the application in Windows system, please use command 'npm start';
       if you are willing to run the application in in Linux system (including mac), please use command 'npm run start_mac';
’‘’

simple introduction and the requirement of Scent Searcher:
Scent Searcher caters to an audience that wants to explore different perfumes, and the
scent notes, (eg: vanilla, rose, amber, etc), they are associated with. The main users of this
platform are known as scent searchers, who have a profile on the platform, and can search
for perfumes by name, or by note combinations. Scent searchers can define some quite
sophisticated search criteria, including specifying which notes they'd like perfumes in their
results to include, and how many notes from their criteria can be missing from perfumes in
search results. Scent searchers can also add a bookmark for any perfumes they're interested
in, so that they can revisit these later. Scent searchers can also help each other by liking,
rating, and writing reviews for the various perfumes on the platform; and the platform itself
can notify Scent searchers when a perfume is added that matches on their favourite notes.
The platform also allows new perfumes to be added, and Scent Searchers can view the full
details of perfumes. See the project objectives for further details on what this platform must
be able to do.
Project Objectives
Scent searchers must be able to maintain a profile where they specify their name, contact
details (email), and favourite scent notes. Given that some scent searchers may not know
which perfumes can match notes they like, scent searchers must be able to search for
perfumes that match a given set of notes, and specify how many of these can be missing
from perfumes in the results (note: results must show which notes in the search criteria are
included for each matching perfume, and be sorted to show perfumes that have a larger
count of matching notes to search criteria, ahead of results with a lower count of matching
notes). The platform must also allow scent searchers to find perfumes by perfume name
(where results should include partial matches (eg: a search for "fir" should also return a
perfume called "first world"), allowing them to then navigate to perfume details for any
results. Once they've found a perfume they like, Scent Searchers must be able to save a
bookmark for it, and be able to see the entire set of all their bookmarked perfumes at any
time, so that they can navigate to the details of any perfume they like in the future. To
further help scent searchers find their desired scents, scent searchers must be able to like
and leave reviews for any perfume on the platform, where each review must include some
text and a rating out of 5; and scent searchers looking through such reviews must be able to
navigate to any review author's profile. Once scent searchers find a perfume they are
interested in, they must be able to view its full details, including it's name, brand,
description, full set of notes, an associated image, associated reviews, average review
rating, and the number of likes for the perfume. Site maintainers (non-technical personnel)
must be able to add details on new perfumes, including details about a perfume's name,
brand, description, note composition (its full set of notes), and an associated image for the
perfume. Scent Searchers would be interested to know about perfumes that include the
entire set of favourite notes mentioned on their profile (here a matching perfume can
include more notes than the scent searcher's favourite notes, but must at least include their
favourite notes), and the platform must notify scent searchers when a new perfume is
added that matches in this way, and allow them to navigate to the full details for that
perfume.
Some of the links you may find interesting relating to this project are shown below. Please
note that project objectives always take priority.
https://www.kaggle.com/sagikeren88/fragrances-and-perfumes
https://www.fragrantica.com/ingredients-search/

Therefore, our project attempts to build a website to provide users with the ability to search for perfumes, explore different perfumes and the notes associated with them. The website will be equipped with a powerful database that will not only have details of the perfumes but will also store information on notes, users, reviews and more. Users will be able to make inquiries about what they are interested in during the process.
Scent is a being with unique abilities. It can sometimes be like a carrier for people to be able to store emotions and memories. Therefore, perfume is increasingly becoming a con-temporary way of life. People want to explore different fragrances and want to understand more deeply the relationship between the various notes in a perfume. But there is no platform that integrates all the fragrances on the market that allows them to search for perfumes by the combination of notes easily and quickly. Sometimes the search results are not an exact match, and the combination of notes is different from what is expected, but it is not immediately intuitive to tell the difference.
The challenges of this project are the following. First, the processing and cleaning of the data will be the difficulties. And to increase the detailed information of the perfume, we also need to store the detailed description of the perfume as well as the pictures through web crawlers. Second, the project will use the latest technology architecture and tech-nology stack for both front-end and back-end. The presentation layer will use HTML, CSS and reactJS. The business layer will use Spring, Spring MVC and Mybatis, and PostgreSQL will be the processing tool for the data layer.

