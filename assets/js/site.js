/* tremolv.com */
(function () {
  "use strict";

  /* ---- the record: switch between what sits in the owner's system and what a buyer receives ---- */
  var record = document.getElementById("record");
  if (record) {
    var swaps = Array.prototype.slice.call(record.querySelectorAll(".swap"));
    var tabs = Array.prototype.slice.call(record.querySelectorAll(".record__tab"));
    var status = document.getElementById("record-status");
    var timers = [];
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var show = function (state, stagger) {
      timers.forEach(clearTimeout);
      timers = [];
      record.setAttribute("data-state", state);
      tabs.forEach(function (t) { t.setAttribute("aria-pressed", String(t.getAttribute("data-show") === state)); });
      status.textContent = state === "out" ? "Leaves only after your sign-off" : "Stays with you";
      swaps.forEach(function (el, i) {
        var apply = function () { el.classList.toggle("is-out", state === "out"); };
        if (stagger && state === "out" && !reduced) { timers.push(setTimeout(apply, 140 * i)); } else { apply(); }
      });
    };

    tabs.forEach(function (t) {
      t.addEventListener("click", function () { show(t.getAttribute("data-show"), true); });
    });

    /* one load moment: show the record as it is, then take the people out of it */
    if (!reduced) { timers.push(setTimeout(function () { show("out", true); }, 1400)); }
  }

  /* ---- fit check ---- */
  var REASONS = {
    years: [
      "Under three years of history is usually too thin for a buyer.",
      "Three to five years is enough to start a conversation.",
      "Five to ten years of history is what buyers look for.",
      "More than ten years of history is rare, and buyers pay for depth."
    ],
    team: {
      xs: "With under 20 people the volume may be small. Long history can make up for it.",
      s: "A team of 20 to 50 usually produces enough records to package.",
      m: "A team of 50 to 500 is the size that suits this best.",
      l: "Over 500 people means plenty of records and a longer legal review on your side."
    },
    channel: {
      chat: "Written chat with customers is the most useful source there is.",
      tickets: "Helpdesk and CRM records show a job from first message to outcome, which is what buyers want.",
      email: "Email threads work, with more cleaning needed.",
      calls: "Recorded calls work once they are transcribed and cleaned.",
      none: "If conversations are not recorded, there is little to license yet."
    },
    sector: {
      retail: "Retail and online brands hold dense customer conversations.",
      logistics: "Logistics records capture multi-step work that AI developers are short of.",
      distribution: "Distribution records show pricing, ordering and negotiation in detail.",
      manufacturing: "Manufacturing records qualify where the planning and supplier work is written down.",
      services: "Professional work qualifies where client confidentiality allows it.",
      software: "Software companies hold tickets, code history and support threads that buyers ask for.",
      other: "We would need to look at your systems to say more."
    },
    rights: {
      free: "No contract restrictions means the records are yours to license.",
      some: "Restricted customers stay out of scope. The rest can go ahead.",
      unsure: "We check your standard customer terms together on the first call."
    }
  };
  var BLOCKS = {
    outsourcing: "Records you hold for your clients belong to those clients, so you cannot license them. Your own internal records may still qualify.",
    health: "Patient records are out of scope. Many countries do not let them leave at all.",
    finance: "Customer records from banks, lenders and insurers are out of scope for now.",
    most: "If most of your contracts forbid sharing, there is too little left to license."
  };
  var POINTS = {
    team: { xs: 0, s: 1, m: 3, l: 2 },
    channel: { chat: 3, tickets: 3, email: 2, calls: 2, none: 0 },
    sector: { retail: 3, logistics: 3, distribution: 3, manufacturing: 2, services: 2, software: 2, other: 1 },
    rights: { free: 3, some: 1, unsure: 1 }
  };

  /* pure: answers in, verdict out. exported for testing. */
  function assess(a) {
    var blocks = [];
    if (BLOCKS[a.sector]) { blocks.push(BLOCKS[a.sector]); }
    if (a.rights === "most") { blocks.push(BLOCKS.most); }
    if (blocks.length) {
      return { verdict: "no", title: "Not a fit yet", summary: "We would rather tell you now than on a call.", reasons: blocks, stop: true, cta: false };
    }
    var years = Number(a.years);
    var reasons = [REASONS.years[years], REASONS.team[a.team], REASONS.channel[a.channel], REASONS.sector[a.sector], REASONS.rights[a.rights]];
    if (years === 0 || a.channel === "none") {
      return { verdict: "early", title: "Probably too early", summary: "Come back when there is more recorded history.", reasons: [years === 0 ? REASONS.years[0] : REASONS.channel.none], stop: true, cta: false };
    }
    var score = years + POINTS.team[a.team] + POINTS.channel[a.channel] + POINTS.sector[a.sector] + POINTS.rights[a.rights];
    if (score >= 11) { return { verdict: "strong", title: "Strong fit", summary: "This is the kind of business buyers ask for.", reasons: reasons, stop: false, cta: true, score: score }; }
    if (score >= 7) { return { verdict: "call", title: "Worth a call", summary: "There is likely something here. Twenty minutes will settle it.", reasons: reasons, stop: false, cta: true, score: score }; }
    return { verdict: "early", title: "Probably too early", summary: "There may not be enough to package yet.", reasons: reasons, stop: false, cta: false, score: score };
  }
  if (typeof module !== "undefined" && module.exports) { module.exports = { assess: assess }; return; }

  var fitForm = document.getElementById("fit-form");
  if (fitForm) {
    var box = document.getElementById("fit-result");
    var title = document.getElementById("fit-title");
    var summary = document.getElementById("fit-summary");
    var list = document.getElementById("fit-reasons");
    var cta = document.getElementById("fit-cta");
    var askFit = document.getElementById("ask-fit");
    var NAMES = ["years", "team", "channel", "sector", "rights"];

    fitForm.addEventListener("change", function () {
      var a = {}, missing = 0;
      NAMES.forEach(function (n) {
        var picked = fitForm.querySelector('input[name="' + n + '"]:checked');
        if (picked) { a[n] = picked.value; } else { missing += 1; }
      });
      if (missing) {
        summary.textContent = missing === 1 ? "One question left." : missing + " questions left.";
        return;
      }
      var r = assess(a);
      box.setAttribute("data-verdict", r.verdict);
      title.textContent = r.title;
      summary.textContent = r.summary;
      list.textContent = "";
      r.reasons.forEach(function (text) {
        var li = document.createElement("li");
        li.textContent = text;
        if (r.stop) { li.className = "is-stop"; }
        list.appendChild(li);
      });
      cta.hidden = !r.cta;
      if (askFit) { askFit.value = r.title; }
    });
  }

  /* ---- request a call: write the email in the visitor's own email app ---- */
  var ask = document.getElementById("ask-form");
  if (ask) {
    var msg = document.getElementById("ask-msg");
    ask.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!ask.checkValidity()) { ask.reportValidity(); return; }
      var v = function (n) { return (ask.elements[n] && ask.elements[n].value || "").trim(); };
      var lines = [
        "Name: " + v("name"),
        "Company: " + v("company"),
        "Email: " + v("email"),
        "Phone or WhatsApp: " + (v("phone") || "not given"),
        "Country: " + v("country"),
        "Fit check: " + (v("fit-result") || "not taken"),
        "",
        v("notes")
      ];
      var href = "mailto:hello@tremolv.com?subject=" + encodeURIComponent("Call request: " + v("company")) + "&body=" + encodeURIComponent(lines.join("\n"));
      window.location.href = href;
      msg.hidden = false;
      msg.setAttribute("data-kind", "ok");
      msg.textContent = "Your email app should now show the request. Press send to finish. If nothing opened, write to hello@tremolv.com.";
    });
  }
})();
