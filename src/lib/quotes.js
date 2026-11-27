export const SETUP = [
  'Nobody gets sharp by staying comfortable. Pick the hard setting.',
  'Your brain is a muscle, and right now it is out of shape. Fix that.',
  'Easy mode is where talent goes to get lazy.',
  'Every second you hesitate, someone else is getting faster.',
  'You did not open this app to feel good. You opened it to get better.',
  'Set the timer. Stop negotiating with yourself.',
  'Excuses do not solve equations.',
  'Comfort is the enemy. Raise the difficulty.',
  'Nobody ever got fast by playing it safe.',
  'Choose the setting that scares you a little.',
  'Warm-ups are for people who plan to lose.',
  'Your future self is watching what you pick right now.',
  'Discipline is doing this when you do not feel like it.',
  'The timer does not care about your mood. Start anyway.',
  'Talent gets you in the door. Reps keep you in the room.',
]

export const SKIP = [
  'Skipping is flinching. Look at the question and fight it.',
  'Three skips in a row. That is not strategy, that is fear.',
  'The question is not too hard. You gave up too fast.',
  'Every skip teaches your brain to quit. Stop teaching it.',
  'Hard questions are the workout. Stop dodging the weights.',
  'You do not get stronger by walking away.',
  'A wrong attempt builds more than a skip ever will.',
  'Stay on it. The answer is closer than you think.',
  'Running from the problem does not make you faster.',
  'Skip button is not a personality. Stand and solve.',
  'You are practicing quitting. Stop.',
  'The ones who improve are the ones who stay with the pain.',
  'Pressing skip is easy. Getting good is not. Choose.',
  'Breathe, read it again, then attack.',
  'Your score is paying for every skip.',
]

export const GOOD = [
  'That is the rhythm. Do not break it.',
  'You are cooking. Keep the pressure on.',
  'Five in a row is a habit starting to form.',
  'Fast and clean. Now make it your normal.',
  'Do not slow down now. This is where records are made.',
  'Your brain just locked in. Stay there.',
  'Streak alive. Do not blink.',
  'This is what focus looks like. Keep it.',
  'Good. Now be greedy and go for more.',
  'You are making it look easy. Make it harder for yourself.',
  'Momentum is rare. Ride it to the end.',
  'Do not celebrate yet. Keep stacking.',
]

export const STUCK = [
  'Stuck is just thinking slowly. Break it into small pieces.',
  'Stay calm. Panic is slower than any calculation.',
  'Take the easy part first, then build up.',
  'Struggling means you are growing. Keep going.',
  'Do not freeze. Make any move and adjust.',
  'The answer is in your head. Go and get it.',
  'This one is trying to beat you. Do not let it.',
  'Slow down, break the numbers apart, solve in steps.',
  'Hard questions made every fast person you admire.',
  'No one else is going to solve it for you.',
  'Pressure is the whole point. Work through it.',
  'Round it, split it, rebuild it. Move.',
]

export const RANDOM = [
  'Every question you solve now makes the next one easier.',
  'Be the person who finishes the session, not the one who plans it.',
  'Average people stop when it gets uncomfortable. Be uncomfortable.',
  'Speed is built one answer at a time. Give another.',
  'Stop thinking about how it feels and keep typing.',
  'You will never regret the session you pushed through.',
  'Nobody is coming to make you better. Do it yourself.',
  'Small daily reps beat big occasional bursts.',
  'Your only competition is the version of you from yesterday.',
  'Focus. The rest of the world can wait sixty seconds.',
  'You are one session away from a new personal best.',
  'Stay hungry. Easy answers are not the goal.',
  'Mistakes are tuition. Keep paying until you graduate.',
  'Be relentless. Be accurate. Be fast. In that order.',
  'If it was easy, it would not be worth doing.',
  'Tired is a feeling, not a stop sign.',
  'Sharp minds are made, not born. Keep making yours.',
  'Win this minute. Then win the next one.',
]

export const FINAL = [
  'Last seconds. Empty the tank.',
  'Finish like you mean it. Every answer counts now.',
  'No coasting. Go hard until the buzzer.',
  'This is where winners separate from the rest.',
  'Ten seconds. Give it everything.',
  'Do not let up now. Sprint to the end.',
]

export const RESULT_LOW = [
  'That was weak, and you know it. Run it again and prove it was a bad day.',
  'Low score. Good. Now you know exactly what to fix.',
  'Nobody is impressed by excuses. Play again.',
  'You skipped your way to this score. Try staying in the fight.',
  'This number is not you. It is where you start. Go again.',
  'Failing here is free. Failing later is expensive. Practice now.',
  'Bad session. Great reason to play another.',
  'Everyone who is fast was once exactly here. They did not quit.',
]

export const RESULT_MID = [
  'Decent. Decent does not win anything. Go again.',
  'You are closer than you think. Do not stop now.',
  'Solid is not the goal. Sharp is.',
  'The gap between good and great is one more session.',
  'Not bad. Not special either. Fix that.',
  'Good enough is the enemy of great. Beat this score.',
  'You have the base. Now add speed.',
  'Middle is a comfortable place to get stuck. Leave.',
]

export const RESULT_HIGH = [
  'Strong. Now try it on Hard, because easy wins are cheap.',
  'Do not get comfortable. Beat your own number.',
  'That is what practice looks like. Do it again tomorrow.',
  'Fast brains are built by repetition, not luck.',
  'Excellent. Now raise the bar before it raises you.',
  'You earned that. Now earn the next one.',
  'Great score. The top does not stay yours unless you defend it.',
  'Sharp. Now prove it was not a fluke.',
]

let last = ''
export function pick(list) {
  let q
  do { q = list[Math.floor(Math.random() * list.length)] } while (q === last && list.length > 1)
  last = q
  return q
}