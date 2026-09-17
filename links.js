/* ------------------------------------------------------------------
   links.js — the ONE place to edit links.

   Two lists below:
     PEOPLE  : collaborator name  ->  where their name should link
     PAPERS  : paper key          ->  arXiv / ePrint / DOI / slides / ...

   Nothing else needs touching. Leave a value as "" and that link simply
   does not appear. The page works fine even if this file is missing.
   ------------------------------------------------------------------ */


/* ---------- 1. Collaborators ---------------------------------------

   Every time one of these names appears in an author line, it becomes a
   link. Right now most point at a DBLP search, which always works.
   Replace any of them with the person's own homepage when you have it —
   just swap the URL, nothing else.                                   */

const PEOPLE = {
  "Subhamoy Maitra":          "https://www.isical.ac.in/~subho/",
  "Arijit Ghosh":             "https://sites.google.com/site/homepagearijitghosh/",
  "Swarnalipa Dutta":         "https://scholar.google.com/citations?user=KWfaL7YAAAAJ&hl=en",
  "Chandrima Kayal":          "https://sites.google.com/view/chandrimakayal/home",
  "Manaswi Paraashar":        "https://sites.google.com/view/manaswi-paraashar/home",
  "Sourav Chakraborty":       "https://dblp.org/search?q=Sourav+Chakraborty",
  "Bimal Mandal":             "https://scholar.google.com/citations?user=LTOTMj0AAAAJ&hl=en",
  "Deng Tang":                "https://scholar.google.com/citations?user=Fhn_DMsAAAAJ&hl=en",
  "Anupam Chattopadhyay":     "https://scholar.google.com/citations?user=TIt4ggwAAAAJ&hl=en",
  "Nikolay Stoyanov Kaleyski":"https://dblp.org/search?q=Nikolay+Kaleyski",
};


/* ---------- 2. Papers ----------------------------------------------

   The key on the left matches the data-key="..." on each paper in
   research.html. Fill in whichever URLs you have — blank ones are
   skipped, so a paper with nothing filled in shows no link row.

   Paste a DBLP record link (dblp.org/rec/...), an arXiv abs page, a
   DOI, a PDF in assets/ — whatever you have. The key name is what
   appears on the button, so you can invent your own (code, poster,
   talk, video).                                                      */

const PAPERS = {

  /* --- manuscripts --- */
  "nonlinearity-estimation": { arXiv: "", ePrint: "", pdf: "" },
  "distribution-free":       { arXiv: "", ePrint: "", pdf: "" },
  "sumset-size":             { arXiv: "", ePrint: "", pdf: "" },
  "near-optimal-testing":    { arXiv: "", ePrint: "", pdf: "" },
  "exact-recovery":          { arXiv: "", ePrint: "", pdf: "" },
  "arithmetic-regularity":   { arXiv: "", ePrint: "", pdf: "" },

  /* --- published --- */
  "spectral-shadows": { arXiv: "", DOI: "", dblp: "", slides: "", video: "" },
  "implicit-sensing": { arXiv: "", DOI: "", dblp: "", slides: "", poster: "",
                        /* OpenReview page for the ICLR version */ link: "" },
  "economical-sieve": { arXiv: "", DOI: "", dblp: "", slides: "", video: "" },

  "price-of-parsimony":   { arXiv: "", DOI: "", dblp: "", slides: "", poster: "" },
  "iso-abelian":          { arXiv: "", DOI: "", dblp: "", slides: "" },
  "maiorana-mcfarland":   { ePrint: "", DOI: "", dblp: "" },
  "differential-uniformity": { ePrint: "", DOI: "", dblp: "", slides: "" },

  "bent-balanced":  { ePrint: "", DOI: "", dblp: "" },
  "sbox-spectra":   { ePrint: "", DOI: "", dblp: "" },
};


/* ==================================================================
   Below this line is the machinery. You should not need to edit it.
   ================================================================== */

(function () {

  /* --- link the collaborator names --------------------------------- */

  // longest names first, so "Arijit Ghosh" wins over a shorter overlap
  const names = Object.keys(PEOPLE)
    .filter(n => PEOPLE[n])
    .sort((a, b) => b.length - a.length);

  if (names.length) {
    const pattern = new RegExp(
      "(" + names.map(n => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")",
      "g"
    );

    document.querySelectorAll(".pub-authors").forEach(el => {
      el.childNodes.forEach(node => {
        if (node.nodeType !== Node.TEXT_NODE) return;
        if (!pattern.test(node.nodeValue)) return;
        pattern.lastIndex = 0;

        const frag = document.createDocumentFragment();
        let last = 0, m;
        while ((m = pattern.exec(node.nodeValue)) !== null) {
          frag.appendChild(
            document.createTextNode(node.nodeValue.slice(last, m.index))
          );
          const a = document.createElement("a");
          a.href = PEOPLE[m[1]];
          a.textContent = m[1];
          a.className = "author-link";
          frag.appendChild(a);
          last = m.index + m[1].length;
        }
        frag.appendChild(document.createTextNode(node.nodeValue.slice(last)));
        node.parentNode.replaceChild(frag, node);
      });
    });
  }

  /* --- number the entries ------------------------------------------- */
  /* One continuous sequence over manuscripts AND publications. The
     oldest entry (bottom of the page) is 1, counting upwards, so the
     newest work carries the highest number. Add or remove a paper and
     the numbering fixes itself.                                       */

  const entries = Array.from(document.querySelectorAll("ol.pubs > li"));
  const total = entries.length;
  entries.forEach((li, i) => li.setAttribute("data-num", total - i));

  /* Older versions of style.css numbered each list with its own CSS
     counter, which restarted at every year. This overrides that, so the
     numbering below is correct whichever style.css is live.           */
  const numberingCSS = document.createElement("style");
  numberingCSS.textContent =
    "ol.pubs { counter-reset: none !important; }" +
    "ol.pubs > li::before {" +
    "  content: attr(data-num) !important;" +
    "  counter-increment: none !important;" +
    "  position: absolute; left: 0; top: 2px;" +
    "  width: 24px; text-align: right;" +
    "  font-variant-numeric: tabular-nums; font-size: 13px;" +
    "}";
  document.head.appendChild(numberingCSS);

  /* --- add the link row under each paper ---------------------------- */

  document.querySelectorAll("[data-key]").forEach(li => {
    const spec = PAPERS[li.getAttribute("data-key")];
    if (!spec) return;

    const title = (li.querySelector(".pub-title") || {}).textContent || "";
    const row = document.createElement("div");
    row.className = "pub-links";

    const LABELS = { dblp: "DBLP", pdf: "PDF", doi: "DOI", link: "page" };

    Object.keys(spec).forEach(label => {
      let url = spec[label];
      if (!url) return;
      if (url === "auto") {
        url = "https://dblp.org/search?q=" + encodeURIComponent(title.trim());
      }
      const a = document.createElement("a");
      a.href = url;
      a.textContent = LABELS[label.toLowerCase()] || label;
      row.appendChild(a);
    });

    if (row.childNodes.length) li.appendChild(row);
  });

})();
