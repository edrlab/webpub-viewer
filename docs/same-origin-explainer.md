# Same-Origin Policy Explainer

## Abstract

Webpub-viewer, resources, and (optionally) streamer must be on the same origin or else, browsers’ security mitigations will kick in and block communication between the Viewer and its internal `iframe`, in which contents are loaded.

The Same-Origin Policy is [explained in depth at MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy). It is something different than CORS (Cross-Origin).

## A Summary of the Same-Origin Policy

For the origin to be considered the same, **protocol (http/https), host and port must be the same.**

To put it simply, an EPUB loaded from another origin can’t communicate with the parent window of the Webpub-viewer to retrieve data and vice-versa, can’t access Web Storage (e.g. `localStorage`), etc. It is restricted.

## Examples

The following will work since both links share the same protocol, (sub)domain and port. 

```
https://www.company.com/viewer/index.html + https://www.company.com/epubs/title-of-the-book/chapter-1.xhtml = success
```

The following will fail since subdomains are different. Consequently, security mitigations will kick in.

```
https://viewer.company.com/index.html + https://epubs.company.com/title-of-the-book/chapter-1.xhtml = failure (different host). 
```

## Possible Workarounds for Cross-Origin

When youre are handling both the viewer and the server, you have some flexibility and can get around the same-origin policy by changing the domain in both resources:

This is [explained in further details at MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy#Changing_origin).

The idea is to configure via JS the domain of both the viewer and EPUB contents to be the superdomain i.e. `company.com`.

In other words, for each XHTML document in EPUBs the streamer is serving, you will have to add something like: 

```
<script type="application/javascript">
  document.domain = "company.com"
</script>
```

The Viewer must also implement this snippet on its side or else it won’t work.

Obviously, in that case, reverse-proxying both subdomains so that they are considered same-origin will be a much better option.