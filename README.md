# Unsafe Links (USL)

Replace Microsoft safelinks with the original destination

### Why would I want unsafe links? What's wrong with safe links? They sound good to me.

Microsoft's "safe links" are automatically injected when sending an email from an Outlook account or from a managed
business email account with Microsoft Defender for Office 365.

Their goal is to warn and retroactively prevent access to destinations deemed dangerous, such as if they're serving
malware or phishing scams. You can read more about how they work
[here](https://learn.microsoft.com/en-us/microsoft-365/security/office-365-security/safe-links-about).

It's a good idea in spirit, but it poses some problems. I'd imagine that for many people, myself included, the tradeoffs
of giving up Microsoft's safe links is worth it.

### Problems with Safe Links

#### 1. It complicates the process of verifying the URL you're visiting

Since the replacement URL is so ugly (see #3), it makes it more difficult to verify the destination of a link. For
years, IT departments have been training their users to hover over a link to make sure it looks legitimate before
clicking it. Safe links wipes all that training away because the destination isn't easily readable. There are various
online decoder tools available, but why should anyone need to do that? And are most casual users even *going* to do
that? No. Sure, you can kind of read the destination, but phishing attacks, the very thing this is designed to protect
against, can use that to their advantage. One character looking off could be deemed as just part of the safe link's "
weird encoding."

#### 2. They allow Microsoft to unnecessarily track you

This is straightforward. Now that every link you click on is pointing to a Microsoft server, they can collect a ton of
information about you, even when you're not using their services. A safe link encodes the destination URL and the email
address it was sent to. They can track the whole chain of forwards and other sharing. Aside from that, they can collect
the general information they get from an HTTP request, such as your IP address and browser's user agent. There's no need
to send this information to Microsoft, and who knows what they do with it?

#### 3. Safe links are ugly

Here's a URL somebody would normally see (and will see with this extension):

https://nicholasmy.com/

And here's what somebody will see when using safe links:

https://nam12.safelinks.protection.outlook.com/?url=https%3A%2F%2Fnicholasmy.com%2F&data=05%7C01%7Credacted%40g-mail.buffalo.edu%7C6a2c7c6c408a45c27b5b08db20d58dbf%7C96464a8af8ed40b199e25f6b50a20250%7C0%7C0%7C638139874082351145%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C2000%7C%7C%7C&sdata=FFynZc1aFfby%2BGTAIGabZSbLHDbgVgdFjr%2FrnL8vcBk%3D&reserved=0

That makes it significantly more difficult to verify the destination you're visiting (See #1).

It also looks ugly from an aesthetic standpoint. Links end up spanning multiple lines and disrupting the flow of a
paragraph rather than fitting naturally. This isn't always the case; sometimes, the link's text will remain looking
clean, but that's not guaranteed as emails go through the chain of forwards, replies, automated ticketing systems, and
different mail clients. It's not predictable what the email will look like.

#### 4. It takes longer to load pages

Instead of directly loading the page you want to visit, you first need to visit Microsoft's "verification" page, which
takes 1-3 seconds before redirecting to the destination. There's no need for this added delay.

#### 5. It doesn't necessarily do what it's supposed to

Finally, safe links are ineffective. Sure, Microsoft can revoke a link after it's a known malicious site, but by that
time, the attackers are going to be 10 domains ahead of them. This is a cat and mouse game rather than a true solution
to prevent phishing and malware distribution.
