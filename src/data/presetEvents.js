// Master script of deterministic game events (visible only to developers)

export const PRESET_EVENTS = [
  { type: "gain", emoji: "🍪", text: "You found a secret cookie stash!", snack: +3 },
  { type: "loss", emoji: "😱", text: "You dropped your slushie!", snack: -2 },
  { type: "gain", emoji: "🎉", text: "Grandma surprises you with a treat!", snack: +4 },
  { type: "loss", emoji: "🥲", text: "You had to share with your sibling.", snack: -1 },
  { type: "gain", emoji: "🍕", text: "Free pizza samples at the trail stop!", snack: +2 },
  { type: "loss", emoji: "🧃", text: "You spilled your juice box.", snack: -2 },
  { type: "gain", emoji: "🍭", text: "Candy trade success! You got extras.", snack: +1 },
  { type: "loss", emoji: "🐶", text: "Your pet stole a snack!", snack: -1 },
  { type: "gain", emoji: "🌟", text: "You found a legendary snack star!", snack: +5 },
  { type: "loss", emoji: "🤕", text: "Tripped on a stick and dropped snacks.", snack: -3 },
  { type: "gain", emoji: "🍫", text: "You won a snack bar in a challenge!", snack: +3 },
  { type: "gain", emoji: "🧃", text: "Someone gifted you a juice box.", snack: +1 },
  { type: "loss", emoji: "😤", text: "Ants invaded your snack bag.", snack: -2 },
  { type: "gain", emoji: "🥇", text: "You outpaced your team for a bonus!", snack: +2 }
];

// You could assign these events deterministically per player/day later
// Example: player1Events = PRESET_EVENTS.slice(0,5); player2Events = PRESET_EVENTS.slice(5,10);
// Then rotate or lock order in game logic