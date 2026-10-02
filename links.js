/* ------------------------------------------------------------------
   links.js — the ONE place to edit links.

   Two lists below:
     PEOPLE : collaborator name -> where their name should link
     PAPERS : paper key -> paper / slides / talk

   For each paper, only these three links are supported:
     paper
     slides
     talk

   A button appears only when its URL is provided.
   If all three are empty, no link row is shown.
   ------------------------------------------------------------------ */


/* ---------- 1. Collaborators --------------------------------------- */

const PEOPLE = {
  "Subhamoy Maitra":           "https://www.isical.ac.in/~subho/",
  "Arijit Ghosh":              "https://sites.google.com/site/homepagearijitghosh/",
  "Swarnalipa Dutta":          "https://scholar.google.com/citations?user=KWfaL7YAAAAJ&hl=en",
  "Chandrima Kayal":            "https://sites.google.com/view/chandrimakayal/home",
  "Manaswi Paraashar":           "https://sites.google.com/view/manaswi-paraashar/home",
  "Sourav Chakraborty":          "https://dblp.org/search?q=Sourav+Chakraborty",
  "Bimal Mandal":                "https://scholar.google.com/citations?user=LTOTMj0AAAAJ&hl=en",
  "Deng Tang":                  "https://scholar.google.com/citations?user=Fhn_DMsAAAAJ&hl=en",
  "Anupam Chattopadhyay":       "https://scholar.google.com/citations?user=TIt4ggwAAAAJ&hl=en",
  "Nikolay Stoyanov Kaleyski":  "https://scholar.google.com/citations?user=YkieG_AAAAAJ&hl=en",
};


/* ---------- 2. Papers ---------------------------------------------- */

const PAPERS = {

  /* --- manuscripts --- */

  "nonlinearity-estimation": {
    paper: "",
    slides: "",
    talk: ""
  },

  "sumset-size": {
    paper: "",
    slides: "",
    talk: ""
  },

  "near-optimal-testing": {
    paper: "",
    slides: "",
    talk: ""
  },

  "exact-recovery": {
    paper: "",
    slides: "",
    talk: ""
  },

  "arithmetic-regularity": {
    paper: "",
    slides: "",
    talk: ""
  },


  /* --- published --- */

  "distribution-free": {
    paper: "https://openreview.net/forum?id=Yptam5J8AE#discussion",
    slides: "",
    talk: ""
  },

  "spectral-shadows": {
    paper: "",
    slides: "",
    talk: ""
  },

  "implicit-sensing": {
    paper: "https://proceedings.iclr.cc/paper_files/paper/2026/hash/634cb3ace86e0908a721865a73f2e36e-Abstract-Conference.html",
    slides: "",
    talk: ""
  },

  "economical-sieve": {
    paper: "https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.STACS.2026.30",
    slides: "",
    talk: ""
  },

  "price-of-parsimony": {
    paper: "https://proceedings.neurips.cc/paper_files/paper/2025/hash/f17376c941d5882050e2e366bb74dffa-Abstract-Conference.html",
    slides: "",
    talk: ""
  },

  "iso-abelian": {
    paper: "https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.APPROX/RANDOM.2025.66",
    slides: "",
    talk: ""
  },

  "maiorana-mcfarland": {
    paper: "https://cic.iacr.org/p/2/2/15",
    slides: "",
    talk: ""
  },

  "differential-uniformity": {
    paper: "",
    slides: "",
    talk: ""
  },

  "bent-balanced": {
    paper: "https://link.springer.com/chapter/10.1007/978-3-031-22912-1_20",
    slides: "",
    talk: ""
  },

  "sbox-spectra": {
    paper: "https://link.springer.com/chapter/10.1007/978-3-030-66626-2_9",
    slides: "",
    talk: ""
  }
};


/* ==================================================================
   Machinery — no need to edit below this line.
   ================================================================== */

(function () {

  /* --- Link collaborator names ------------------------------------ */

  const names = Object.keys(PEOPLE)
    .filter(n => PEOPLE[n])
    .sort((a, b) => b.length - a.length);

  if (names.length) {

    const pattern = new RegExp(
      "(" +
      names
        .map(n => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        .join("|") +
      ")",
      "g"
    );

    document.querySelectorAll(".pub-authors").forEach(el => {

      el.childNodes.forEach(node => {

        if (node.nodeType !== Node.TEXT_NODE) return;

        if (!pattern.test(node.nodeValue)) return;

        pattern.lastIndex = 0;

        const frag = document.createDocumentFragment();

        let last = 0;
        let m;

        while ((m = pattern.exec(node.nodeValue)) !== null) {

          frag.appendChild(
            document.createTextNode(
              node.nodeValue.slice(last, m.index)
            )
          );

          const a = document.createElement("a");

          a.href = PEOPLE[m[1]];
          a.textContent = m[1];
          a.className = "author-link";
          a.target = "_blank";
          a.rel = "noopener";

          frag.appendChild(a);

          last = m.index + m[1].length;
        }

        frag.appendChild(
          document.createTextNode(
            node.nodeValue.slice(last)
          )
        );

        node.parentNode.replaceChild(frag, node);
      });

    });
  }


  /* --- Add paper / slides / talk buttons -------------------------- */

  document.querySelectorAll("[data-key]").forEach(li => {

    const key = li.getAttribute("data-key");
    const spec = PAPERS[key];

    if (!spec) return;


    /* Only these three links are allowed */

    const LINKS = [
      {
        key: "paper",
        label: "paper"
      },
      {
        key: "slides",
        label: "slides"
      },
      {
        key: "talk",
        label: "talk"
      }
    ];


    /* Find links that actually exist */

    const available = LINKS.filter(item => spec[item.key]);


    /* Nothing to show */

    if (!available.length) return;


    /* Create the link row */

    const row = document.createElement("span");

    row.className = "pub-links";


    available.forEach(item => {

      const a = document.createElement("a");

      a.href = spec[item.key];
      a.textContent = item.label;

      a.target = "_blank";
      a.rel = "noopener";

      row.appendChild(a);

    });


    /* Put buttons after the publication metadata */

    const meta = li.querySelector(".pub-meta");

    if (meta) {
      meta.appendChild(row);
    } else {
      li.appendChild(row);
    }

  });

})();
