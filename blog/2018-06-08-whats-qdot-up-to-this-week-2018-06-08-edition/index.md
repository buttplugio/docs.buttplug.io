---
title: "What's qDot Up To This Week? (2018-06-08 Edition)"
date: 2018-06-08
---
Ok, gonna try a new thing. Weekly updates! Just so you have some idea what's going on, since you're like, you know, paying me.These will probably get posted on Wednesdays from here on out.

**This Week: **Unfortunately the update this week is gonna be super boring, because it's one of those super boring tasks weeks. Almost all of my time has been spent shuffling our hosting, so the end of this post is going to be about one of the topics nobody voted for in that last poll. :)

<!--truncate-->

Also did some work on a Will It Buttplug? video, just to see if I can start cranking those out a little faster. The UFO SA video took 5 days of work, and I'd like to be able to release a video every 1-2 weeks versus every 3 months.

**Plans for Next Week:** I have to travel for my dayjob (all the way across the bay bridge to San Francisco :) ) next week, but that doesn't mean things won't get done. I usually hide in my hotel room during the evenings, so there may be work happening. I'm also planning on starting up a couple of new polls to drill down on the results from the last one, since people want more videos and more  

**The Horrible Details Of Moving Hosting:**

**Note:** If you aren't interested in the details of hosting moves, the rest of this post has absolutely nothing to do with sex toys, you can probably just skip this. If you happen to be paying me for sex toy work and also have an interest in devops, consider this some extra bargains for your cash!

I've been hosting my sites on Dreamhost shared hosting for the past 16 or so years, 'cause, well, I never had much in the way of needs. Almost everything we host is either a static site or a client-side SPA. However, that hosting is super slow ('cause it's shared), and isn't really going to scale for our needs, and I didn't want to just sit Cloudflare in front of it. 

The original plan was to move to AWS. While I finally managed to get the AWS chain of s3, Route 53, CloudFront and Certificate Management going (buttplug.io and buttplug.world are currently running on this setup), it kinda sucked to set up for new sites and manage for the ones I'd moved, and it was really hard to track resource requirements, even though our sites are static. I still couldn't really figure out when/why we were getting S3 puts/gets, despite having set up metrics management. 

The next move was going to be taking metafetish.com from DH to AWS, but that was turning into a nightmare due to the massive amount of redirect rules (1200+) metafetish has thanks to having existed for 14 years across 4 blog engine moves (soon to be 5 as it will move to Hexo from Pelican), as they would have to be expressed as s3 object redirects, which would require a ton of scripting to set up and would drop some of the wildcard rules I was currently running in Apache. 

Having stalled on that move, I stumbled upon Netlify ( [https://netlify.com](https://netlify.com) ) which looks like exactly what we need. They're made for static site or SPA hosting, and they're like, weirdly free. I've got one of my domains moved over there now, and will be moving buttplug.io and buttplug.world there over the weekend, followed by figuring out how metafetish.com will work out there.

Honestly, this isn't gonna mean much for users, possibly ever. It mainly buys us reliability just in case we get featured on HN or something, but that's a very "what if" case. It's still more flexible than static hosting though, and Netlify folds in Let's Encrypt management, does their own CI, etc, so it's less steps from nothing to working site.

In the end, we'll be hosting all static sites on Netlify, and anything that requires compute resources on Digital Ocean Droplets. Our Discourse instance is currently taking up pretty much all of a $10/month Droplet (thanks, Ruby On Rails :| ), and I may move Matomo Analytics onto a Droplet over there too, which will pretty much finish off my Dreamhost hosting.

I cannot wait to get back to literally anything other than this.