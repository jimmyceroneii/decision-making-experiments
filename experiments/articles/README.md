## Random Articles

In Matter, my reading app, I've got a backlog of 14,000 articles. It is hard to decide what to read next. I am bombarded by new content via their RSS / email solution as well. I want to make my workflow easier, separating the deciding I want to read something from the deciding what I want to read.

I want my inbox to be all yes no decisions. I want a separate way to filter what gets in to my queue. For now, I'm using randomness. I've set this up so that every day, a random article is sent to my inbox along with 10 similar links.

I am using Resend to send the email, Exa.ai to find the similar links, and a simple shuffle function to pick the link.

### Weighted Randomness

Recently I moved beyond a simple random sort to choose the daily article. I now use weighted randomness.

What is weighted randomness? I assign a score to each article. Right now the score is simple, based on word count and time in queue.

Each point in the scoring system acts as a weight. Think of it like a raffle. Long articles that have been in my queue a long time have many raffle tickets.

Short recent articles have few raffle tickets. Thus it is more likely, but not certain, that longer articles are more likely to be chosen.

Why do weighted randomness? I am not certain about my filter. It might be imperfect. Thus I do not want to be deterministic here. I want an element of chance to be retained.

But, I do want to tip the scales in favor of some articles over others.
