# CodePet 🐣

A digital pet that grows based on your coding habits. Log your coding sessions and watch it evolve from an Egg to a Senior Developer.

## Features

- 5 evolution stages: Egg, Baby, Junior, Developer, Senior
- Streak tracking for daily coding
- Health that drops if you skip a day
- 10 EXP for every 10 minutes coded

## Usage

`src/CodePet.jsx` is a single React component. It uses Tailwind CSS classes and `lucide-react` icons:

```bash
npm install lucide-react
```

Then import and render it in your app:

```jsx
import CodePet from './CodePet';

export default function App() {
  return <CodePet />;
}
```

## Ideas

- Auto-track activity from GitHub commits
- Persist pet state with localStorage
- Custom pet styles and names
