/**
 * AURANGZEB MIRANI – Royal Dostana Department
 * Master Interactive Logic & Sound Engine
 */

// Global State
let soundEnabled = true;
let audioCtx = null;

// Initialize Web Audio API on first user interaction
function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// ==========================================
// PURE WEB AUDIO API SYNTHESIZER
// (100% Reliable, zero 404s, works offline/file://)
// ==========================================
const SoundFX = {
  // Royal Fanfare Trumpets for Mirani Sahab
  playRoyalFanfare() {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      const notes = [
        { f: 523.25, d: 0.15, t: 0 },    // C5
        { f: 523.25, d: 0.15, t: 0.18 }, // C5
        { f: 523.25, d: 0.15, t: 0.36 }, // C5
        { f: 659.25, d: 0.4,  t: 0.54 }, // E5
        { f: 523.25, d: 0.2,  t: 0.98 }, // C5
        { f: 783.99, d: 0.7,  t: 1.22 }  // G5
      ];
      notes.forEach(n => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.f, ctx.currentTime + n.t);
        gain.gain.setValueAtTime(0, ctx.currentTime + n.t);
        gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + n.t + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + n.t + n.d);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + n.t);
        osc.stop(ctx.currentTime + n.t + n.d + 0.05);
      });
    } catch(e) { console.log(e); }
  },

  // Cannon Boom Sound for 21-Topon Ki Salami
  playCannonBoom() {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      const bufferSize = ctx.sampleRate * 1.5;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(250, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 1.2);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.4);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(ctx.currentTime);
      noise.stop(ctx.currentTime + 1.5);
    } catch(e) { console.log(e); }
  },

  // Funny Desi Boing / Comedy Slapstick
  playBoing() {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(750, ctx.currentTime + 0.15);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.38);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.4);
    } catch(e) { console.log(e); }
  },

  // Dramatic Soap Opera "Dhum Tanana" suspense sting
  playDramaticSting() {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      [220, 277.18, 329.63].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8 + idx * 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.9);
      });
    } catch(e) { console.log(e); }
  },

  // Success / Achievement Chime
  playSuccessChime() {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      const notes = [587.33, 739.99, 880, 1174.66]; // D5, F#5, A5, D6
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
        gain.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + i * 0.08 + 0.45);
      });
    } catch(e) { console.log(e); }
  }
};

function playRandomDesiSound() {
  const sounds = [
    () => { SoundFX.playRoyalFanfare(); showToast("🎺 Shahi Horn Baja Diya Gaya!", "bg-amber-600"); },
    () => { SoundFX.playBoing(); showToast("🤪 Chawal Detected!", "bg-purple-600"); },
    () => { SoundFX.playDramaticSting(); showToast("😱 Star Plus Dramatic Moment!", "bg-pink-600"); },
    () => { SoundFX.playCannonBoom(); showToast("💣 Top Ka Dhamaka!", "bg-red-600"); }
  ];
  const chosen = sounds[Math.floor(Math.random() * sounds.length)];
  chosen();
}

// Sound toggle button in top banner
document.addEventListener('DOMContentLoaded', () => {
  const soundBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');
  const soundLabel = document.getElementById('soundLabel');

  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      if (soundEnabled) {
        soundIcon.className = 'fa-solid fa-volume-high';
        soundLabel.textContent = 'Desi Sounds: ON';
        showToast("🔊 Desi Sound Effects ON!", "bg-emerald-600");
        SoundFX.playSuccessChime();
      } else {
        soundIcon.className = 'fa-solid fa-volume-xmark';
        soundLabel.textContent = 'Desi Sounds: OFF';
        showToast("🔇 Sounds Muted!", "bg-slate-700");
      }
    });
  }

  // Setup mobile navigation toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
    // Close mobile menu on clicking any link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Spawn floating background emojis
  spawnFloatingEmojis();

  // Periodically generate simulated chat and random toasts
  setInterval(triggerRandomBanterToast, 18000);
});

// ==========================================
// FLOATING EMOJIS BACKGROUND
// ==========================================
function spawnFloatingEmojis() {
  const container = document.getElementById('floating-emojis-container');
  if (!container) return;
  const emojis = ['👑', '🥭', '☕', '🤯', '🦥', '📢', '🕵️', '😂', '✨', '💣', '🫡', '🍟'];

  for (let i = 0; i < 20; i++) {
    const el = document.createElement('div');
    el.className = 'floating-emoji text-xl sm:text-2xl';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = Math.random() * 95 + '%';
    el.style.animationDuration = (Math.random() * 12 + 14) + 's';
    el.style.animationDelay = (Math.random() * 15) + 's';
    container.appendChild(el);
  }
}

// ==========================================
// 21-TOPON KI SALAMI (ROYAL SALUTE)
// ==========================================
function triggerRoyalSalute() {
  SoundFX.playCannonBoom();
  setTimeout(() => SoundFX.playRoyalFanfare(), 400);

  // Confetti explosion from sides
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6, x: 0.2 },
      colors: ['#fbbf24', '#f59e0b', '#d97706', '#ffffff']
    });
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6, x: 0.8 },
      colors: ['#fbbf24', '#f59e0b', '#a855f7', '#ec4899']
    });
  }

  showToast("💥 21-TOPON KI SALAMI! Aurangzeb Mirani Sahab Zindabad! 👑", "bg-amber-600 text-slate-950 font-black");
}

function saluteMiraniSahab() {
  SoundFX.playRoyalFanfare();
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#fbbf24', '#ffffff', '#eab308']
    });
  }
  showToast("🫡 ADAB ARZ HAI JANAB! Sir Ka Hukam Sar Aankhon Par! 👑", "bg-amber-500 text-slate-950 font-bold");
}

function pourGoldenChai() {
  SoundFX.playSuccessChime();
  showToast("☕ Shahi Malai Chai Hazrat Mirani Sahab Ki Khidmat Mein Hazir Hai!", "bg-amber-700");
}

// ==========================================
// FRIENDS DOSSIER MODALS DATA & LOGIC
// ==========================================
const friendsData = {
  sardar: {
    name: "Sardar Khan Lashari",
    title: "Nawab-e-Bekari, CEO of Time Zaya Corporation",
    emoji: "🦥",
    accent: "purple",
    intro: "Sardar Khan Lashari wo Azeem shaksiyat hain jinka waqt guzarna nahi balkay waqt ko zaya karna maqsad-e-hayat hai. Inka confidence itna be-panah hai ke bina parhay exam mein top karne ka dawah karte hain, magar logic abhi tak 1998 ke dial-up internet par load ho rahi hai!",
    habits: [
      "Subah 11 baje uth kar kehna: 'Aaj bohot thak gaya hoon, thoda aaraam kar loon.'",
      "'Bas bhai 5 minute mein aaya' bol kar 3 ghantay so jana.",
      "Gym ki tees fees bhari hui hain lekin gym kahan hai yeh yaad nahi."
    ],
    dialogue: "Bhai main chal para hoon, bas shirt dhoond raha hoon (still on bed in blanket)."
  },
  ubaid: {
    name: "Ubaid Mango",
    title: "Mango Empire Ka Badshah & All-Weather Fruit Master",
    emoji: "🥭",
    accent: "orange",
    intro: "Janab Ubaid Mango sahab ka taluq seedha Aam ki saltanat se hai. Duniya ka koi bhi masla ho — chahe economic crisis ho, car ka tyre puncture ho ya dil toota ho — Ubaid ka solution aik hi hai: 'Bhai tu ek Sindhri aam kha, sab theek ho jayega!'",
    habits: [
      "December ki shadeed sardi mein dry fruit chor kar aam mangna.",
      "Biryani ke sath mango shake peene ki koshish karna.",
      "Har conversation ko kisi na kisi tarah Chaunsa ya Anwar Ratol par le aana."
    ],
    dialogue: "Masla koi bhi ho, solution sirf Aam hai!"
  },
  abdullah: {
    name: "Abdullah Surhio",
    title: "Professor of Overthinking & Dean of Deep Stress",
    emoji: "🧐",
    accent: "cyan",
    intro: "Professor Abdullah Surhio aik aisi hasti hain jo aik full stop '.' ko dekh kar bhi 4 ghantay soch sakte hain. Agar waiter ne 'Have a nice day' bol diya toh Abdullah foran sochna shuru kar denge ke 'Iske peeche kya deep geopolitical conspiracy hai?'",
    habits: [
      "WhatsApp par single tick dekh kar dosti tootne ka andaza lagana.",
      "Subah se shaam tak sochna ke kal kya socha tha.",
      "Chai thandi hone par existential crisis mein mubtala ho jana."
    ],
    dialogue: "Yaar usne 'OK' likha tha ya 'Ok'? Dono mein zameen asmaan ka farq hai!"
  },
  orangzeb: {
    name: "Orangzeb Buriro",
    title: "Minister of Unlimited Bakwas & 5G Loudspeaker",
    emoji: "📢",
    accent: "pink",
    intro: "Orangzeb Buriro wo insaan hain jinki zaban ko battery ki zaroorat nahi parti. Subah se shuru ho kar raat tak aisi baatein karenge jinka koi sar ho na pair. Inki baaton mein logic dhoondna aisa hai jaise samandar mein machhar ka anday dhoondna!",
    habits: [
      "Group mein 22 minute ka audio bhejna jisme 20 minute sirf 'Haan yaar suno' ho.",
      "Topic change karne ki speed: 300 km/h.",
      "Bina sune kisi bhi behas mein jump laga dena aur jeet jana."
    ],
    dialogue: "Meri baat suno pehle, poori baat suno... (1 hour later) ...haan main kya keh raha tha?"
  },
  milhan: {
    name: "Milhan",
    title: "Secret Agent of Dosti & Undercover Phantom",
    emoji: "🕵️‍♂️",
    accent: "emerald",
    intro: "Milhan aik aisa mystery man hai jiski asliat NASA aur CIA mil kar bhi trace nahi kar sakeen. Group chat mein 24 ghantay silent reader rehta hai, lekin jaise hi sab plan bana kar cancel karte hain, Milhan pop up hota hai: 'Chalo bhai main tayar hoon!'",
    habits: [
      "Last seen: 1947.",
      "Message dekh kar 15 din baad 'Ji' likhna.",
      "Gathering mein sab se aakhir mein aana aur sab se pehle gayab ho jana."
    ],
    dialogue: "Main yahin tha bhai, bas thoda sa offline tha."
  }
};

function openFriendModal(key) {
  const friend = friendsData[key];
  if (!friend) return;

  SoundFX.playBoing();
  const modal = document.getElementById('friendModal');
  const content = document.getElementById('friendModalContent');

  content.innerHTML = `
    <div class="flex items-center gap-4 border-b border-white/10 pb-4">
      <div class="w-16 h-16 rounded-2xl bg-slate-800 border border-${friend.accent}-500/50 flex items-center justify-center text-3xl shadow-lg">
        ${friend.emoji}
      </div>
      <div>
        <h3 class="text-xl font-bold font-royal text-white">${friend.name}</h3>
        <p class="text-xs text-amber-400 font-bold">${friend.title}</p>
      </div>
    </div>

    <div class="space-y-3 py-2 text-xs sm:text-sm text-slate-300">
      <p class="leading-relaxed bg-slate-800/60 p-3 rounded-xl border border-white/5 italic">
        "${friend.intro}"
      </p>

      <div>
        <h4 class="font-bold text-white text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <i class="fa-solid fa-list-check text-amber-400"></i> Top Kartoot & Habits:
        </h4>
        <ul class="space-y-1.5 text-xs text-slate-300">
          ${friend.habits.map(h => `<li class="flex items-start gap-2"><span class="text-amber-400 font-bold">•</span><span>${h}</span></li>`).join('')}
        </ul>
      </div>

      <div class="bg-${friend.accent}-950/40 border border-${friend.accent}-500/30 p-3 rounded-xl">
        <span class="block text-[10px] uppercase font-bold text-${friend.accent}-400">Signature Dialogue:</span>
        <span class="text-xs font-medium text-white italic">"${friend.dialogue}"</span>
      </div>
    </div>

    <div class="pt-2 flex justify-end">
      <button onclick="closeFriendModal()" class="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition">
        Band Karo Yeh Fazooliat
      </button>
    </div>
  `;

  modal.classList.remove('hidden');
}

function closeFriendModal() {
  document.getElementById('friendModal').classList.add('hidden');
}

function openMiraniModal() {
  SoundFX.playRoyalFanfare();
  document.getElementById('miraniModal').classList.remove('hidden');
}

function closeMiraniModal() {
  document.getElementById('miraniModal').classList.add('hidden');
}

// Close modals when clicking backdrop
window.onclick = function(event) {
  const friendModal = document.getElementById('friendModal');
  const miraniModal = document.getElementById('miraniModal');
  if (event.target === friendModal) closeFriendModal();
  if (event.target === miraniModal) closeMiraniModal();
};

// ==========================================
// AWARDS TAALIYAN & CONFETTI
// ==========================================
function awardConfetti(winner, awardName) {
  SoundFX.playSuccessChime();
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 }
    });
  }
  showToast(`🏆 ${winner} ko "${awardName}" Mubarak Ho! Taaliyan! 👏`, "bg-purple-600");
}

// ==========================================
// FUNNY DIALOGUES (ROMAN URDU QUOTES)
// ==========================================
const quotesList = [
  { text: "Bhai main serious hoon, bas meri shakal serious nahi.", author: "Nawab Sardar Khan Lashari" },
  { text: "Parhai kal se, aaj sirf planning.", author: "Abdullah Surhio (Overthinker)" },
  { text: "Hum dost nahi, aik doosray ki musibat hain!", author: "Orangzeb Buriro (Minister)" },
  { text: "Mirani Sahab ka hukam final hai! No debate, no argument!", author: "Tamam Shahi Dost Council 👑" },
  { text: "Bhai bas 2 minute mein pohanch raha hoon (said from bed).", author: "Sardar Khan Lashari" },
  { text: "Chai main pilaunga, bas koi bill pay karde.", author: "Dostana Principle #4" },
  { text: "Group mein shanti tab hoti hai jab sabka mobile charging par ho.", author: "Milhan The Ghost" },
  { text: "Masla chahe jo bhi ho, pehle do glass mango shake piyo!", author: "Ubaid Mango King" },
  { text: "Usne 'K' bola tha dot ke baghair... Main raat bhar so nahi saka.", author: "Professor Abdullah Surhio" }
];

let currentQuoteIndex = 0;

function setDialogue(idx) {
  if (quotesList[idx]) {
    currentQuoteIndex = idx;
    displayCurrentDialogue();
    SoundFX.playBoing();
  }
}

function generateRandomDialogue() {
  SoundFX.playBoing();
  let nextIdx;
  do {
    nextIdx = Math.floor(Math.random() * quotesList.length);
  } while (nextIdx === currentQuoteIndex && quotesList.length > 1);

  currentQuoteIndex = nextIdx;
  displayCurrentDialogue();
}

function displayCurrentDialogue() {
  const quote = quotesList[currentQuoteIndex];
  const textEl = document.getElementById('dialogueText');
  const authorEl = document.getElementById('dialogueAuthor');

  if (textEl && authorEl) {
    textEl.classList.remove('animate-fade-in');
    void textEl.offsetWidth; // trigger reflow
    textEl.classList.add('animate-fade-in');

    textEl.textContent = `"${quote.text}"`;
    authorEl.textContent = `— ${quote.author}`;
  }
}

function copyDialogue() {
  const quote = quotesList[currentQuoteIndex];
  const str = `"${quote.text}" — ${quote.author} (Aurangzeb Mirani Royal Dostana)`;
  navigator.clipboard.writeText(str).then(() => {
    SoundFX.playSuccessChime();
    const btn = document.getElementById('copyBtnText');
    if (btn) btn.textContent = 'Copied! ✅';
    showToast("📋 Dialogue Clipboard Mein Copy Ho Gaya!", "bg-cyan-600");
    setTimeout(() => {
      if (btn) btn.textContent = 'Copy Dialogue';
    }, 2000);
  });
}

function speakDialogue() {
  if ('speechSynthesis' in window) {
    const quote = quotesList[currentQuoteIndex];
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(quote.text);
    utterance.rate = 0.95;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
    showToast("🎙️ Speaking: " + quote.text, "bg-purple-600");
  } else {
    showToast("Awaaz browser support nahi karta!", "bg-red-600");
  }
}

// ==========================================
// FRIENDSHIP METER (INTERACTIVE LOGIC)
// ==========================================
function calculateDostiMeter() {
  const f1 = document.getElementById('friendSelect1').value;
  const f2 = document.getElementById('friendSelect2').value;

  const resultBox = document.getElementById('meterResultBox');
  const scoreEl = document.getElementById('meterScore');
  const circleEl = document.getElementById('meterCircle');
  const titleEl = document.getElementById('meterTitle');
  const remarkEl = document.getElementById('meterRemark');

  resultBox.classList.remove('hidden');

  // Special Rule for Aurangzeb Mirani Sahab:
  // Mirani Sahab always gets 1000% supreme loyalty and respect!
  const isMiraniInvolved = f1.includes('Mirani') || f2.includes('Mirani');

  let percentage = 0;
  let title = "";
  let remark = "";

  if (isMiraniInvolved) {
    SoundFX.playRoyalFanfare();
    percentage = 1000;
    title = "👑 1000% SHAHI WAFAADARI!";
    remark = `Hazrat Aurangzeb Mirani Sahab ki shaan ke aage meter hi break ho gaya! Yeh dosti nahi, Shahi Wafaadari hai! Sir ka hukam sar aankhon par! 🫡✨`;

    // Confetti burst
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#fbbf24', '#f59e0b', '#ffffff']
      });
    }
  } else if (f1 === f2) {
    SoundFX.playBoing();
    percentage = 100;
    title = "🪞 Khud Se Mohabbat (Narcissism Peak)";
    remark = `${f1} apne aap se itna pyaar karta hai ke aaine mein dekh kar khud ko hi chai offer kar deta hai!`;
  } else {
    SoundFX.playSuccessChime();
    // Random between 50% and 100%
    percentage = Math.floor(Math.random() * 51) + 50;

    const diagnoses = [
      {
        t: "Chai & Paratha Bond! ☕",
        r: `${f1} aur ${f2} ki dosti tab tak zinda hai jab tak hotel wala bill maangne na aa jaye!`
      },
      {
        t: "Khatarnak Chawal Duo! 🤪",
        r: `Dono mil kar aisi aisi planning karte hain jisse dekh kar NASA ke scientist sar pakad ke baith jaate hain!`
      },
      {
        t: "Voice Note Overload! 📢",
        r: `Inki dosti 90% lambi audio recording aur 10% 'Acha theek hai' par chal rahi hai!`
      },
      {
        t: "Unbreakable Pakistani Dostana! 🤝",
        r: `Chahe jitni marzi taang khainchain, aakhir mein aik hi plate mein biryani khayenge!`
      }
    ];

    const diag = diagnoses[Math.floor(Math.random() * diagnoses.length)];
    title = diag.t;
    remark = diag.r;

    if (typeof confetti === 'function') {
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.7 }
      });
    }
  }

  // Display Animated Values
  scoreEl.textContent = isMiraniInvolved ? "1000%" : `${percentage}%`;
  titleEl.textContent = title;
  remarkEl.textContent = `"${remark}"`;

  // Animate SVG Circle (circumference = 2 * PI * 50 = 314)
  const clampedPct = Math.min(percentage, 100);
  const offset = 314 - (314 * clampedPct) / 100;
  circleEl.style.strokeDashoffset = offset;

  showToast(`💖 Dosti Score: ${percentage}%!`, "bg-pink-600");
}

// ==========================================
// SIMULATED LIVE WHATSAPP CHAT
// ==========================================
const funnyChatMessages = [
  { sender: "Sardar Khan Lashari", color: "text-purple-400", text: "Bhai koi mujhe pick kar lo, meri bike mein hawa kam hai! 🚴" },
  { sender: "Ubaid Mango", color: "text-orange-400", text: "Maine aam ka achaar khate hue soch liya hai: Aaj hotel hum chalenge!" },
  { sender: "Abdullah Surhio", color: "text-cyan-400", text: "Yaar agar hotel wale ne 20 rupay zyada lagaye toh kya wo inflation hai ya dhoka?" },
  { sender: "Orangzeb Buriro", color: "text-pink-400", text: "Bhai aik fresh update aayi hai... suno 15 minute ka voice note bhej raha hoon!" },
  { sender: "Milhan", color: "text-emerald-400", text: "Main 10 minute pehle offline tha, ab online hoon, 2 minute baad phir gayab!" },
  { sender: "Aurangzeb Mirani Sahab", color: "text-amber-300 font-bold", isRoyal: true, text: "Fuzool baatein band karo aur time par pohoncho. Bill Mirani Sahab ke accounts se clear hoga! 👑" }
];

function addSimulatedChat() {
  const container = document.getElementById('chatStreamBox');
  if (!container) return;

  const msg = funnyChatMessages[Math.floor(Math.random() * funnyChatMessages.length)];
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const div = document.createElement('div');
  if (msg.isRoyal) {
    SoundFX.playRoyalFanfare();
    div.className = "flex flex-col items-end space-y-1 animate-fade-in";
    div.innerHTML = `
      <span class="text-[10px] font-bold ${msg.color} mr-2 flex items-center gap-1">
        <i class="fa-solid fa-crown text-amber-400"></i> ${msg.sender}
      </span>
      <div class="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-semibold px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-[85%] shadow-lg border border-amber-300">
        "${msg.text}"
        <span class="block text-[9px] text-slate-900 font-bold text-right mt-1">${time} ✓✓</span>
      </div>
    `;
  } else {
    SoundFX.playBoing();
    div.className = "flex flex-col items-start space-y-1 animate-fade-in";
    div.innerHTML = `
      <span class="text-[10px] font-bold ${msg.color} ml-2">${msg.sender}</span>
      <div class="bg-slate-800 text-slate-200 px-3.5 py-2 rounded-2xl rounded-tl-sm max-w-[85%] shadow">
        ${msg.text}
        <span class="block text-[9px] text-slate-400 text-right mt-1">${time}</span>
      </div>
    `;
  }

  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

// ==========================================
// TOAST NOTIFICATIONS SYSTEM
// ==========================================
function showToast(message, bgClass = "bg-purple-600") {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast-item ${bgClass} text-white px-4 py-3 rounded-2xl shadow-2xl text-xs sm:text-sm font-medium flex items-center gap-3 border border-white/20`;
  toast.innerHTML = `
    <span>${message}</span>
    <button onclick="this.parentElement.remove()" class="text-white/70 hover:text-white ml-auto">
      <i class="fa-solid fa-xmark"></i>
    </button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}

// Random banter notifications popping up occasionally
const banterList = [
  "💬 Sardar Khan is typing... (for the past 45 minutes)",
  "🥭 Ubaid Mango added 12 kilograms of Sindhri Aam to cart",
  "🧠 Abdullah Surhio started overthinking about yesterday's chai",
  "🎙️ Orangzeb Buriro sent a 19-minute audio note",
  "🕵️ Milhan went offline without saying goodbye",
  "👑 Aurangzeb Mirani Sahab entered the royal court: Ba-Adab Ba-Mulahiza!"
];

function triggerRandomBanterToast() {
  const randomMsg = banterList[Math.floor(Math.random() * banterList.length)];
  showToast(randomMsg, "bg-slate-800/90 text-amber-300 border-amber-500/30");
}
