# Bible Search
Production: [https://verse-search.vercel.app/](https://verse-search.vercel.app/)

### Description

It is a search tool where user can find bible verses related to a specifc keyword. User can also filter by book and change between bible versions.

### Features
- Find bible verses via keyword search
- Change bible version
- Filter by bible book

### Languages

HTML | Javascript | CSS | TypeScript

### Tech used
- React
- Next.js
- Bootstrap
- Third party APIs

### Challenges
Overall, these challenges helped me learn more about how to integrate third-party APIs, manage URL-based state, and make apps more user-friendly and shareable:

#### 1. Figuring Out the Third-Party API
One of the main challenges was working with the external Bible API. The documentation was either missing or not very clear, especially when it came to using the keyword search. It took some trial and error to figure out the correct query parameters and how to structure the request to get back the results I wanted.

#### 2. Making Searches Shareable
Another tricky part was updating the URL with the user's keyword so they could copy the link and share it with friends. Since the app uses Next.js and client-side routing, I had to learn how to work with query parameters in a way that kept the search state in sync with the URL. This was a new concept for me, and it took some time to get right.

---

## Getting Started

```bash
# Install dependencies (uses Bun)
bun install

# Run in dev mode
bun dev
