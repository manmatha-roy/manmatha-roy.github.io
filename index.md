---
layout: default
title: Home
---



<style>
.hero {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

/* Mobile first: stack vertically on small screens */
@media (max-width: 767px) {
  .hero {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .hero img.profile-photo {
    order: 1;
    max-width: 150px;
    width: 100%;
    height: auto;
  }
  .hero .hero-text {
    order: 2;
  }
  .hero .cta {
    order: 3;
    margin-top: 0.5rem;
  }
  .about {
    margin-top: 2rem;
    padding: 0 1rem;
  }
}
</style>

<section class="hero">
  <img src="/assets/profile.jpg" alt="Profile photo" class="profile-photo" />
  <div class="hero-text">
    <h1>Manmatha Roy</h1>
    <p class="lead">Associate Scientist A, Indian Statistical Institute, Kolkata</p>
  </div>
</section>

<section class="about" style="font-size: 1.15rem; line-height: 1.6; max-width: 700px; margin: 1.5rem auto;">
<p>
  I am a researcher at the <a href="https://www.isical.ac.in/" target="_blank">Indian Statistical Institute, Kolkata</a>, where I am also pursuing a PhD under the joint supervision of 
  <a href="https://isi.irins.org/profile/61161" target="_blank">Prof. Subhamoy Maitra</a> and 
  <a href="https://sites.google.com/site/homepagearijitghosh/" target="_blank">Dr. Arijit Ghosh</a>. 

My research lies in Theoretical Computer Science, with a particular focus on Boolean functions. I study their structural properties and design efficient algorithms for problems arising in cryptography, coding theory, and learning theory. 
</p>

<p>
Before moving to ISI Kolkata, I spent a couple of years at the Centre for Distributed Computing, Jadavpur University, where I worked in projects involving the design and development of mission critical applications.
</p>

<!-- 

<p>
  You may find my resume  
  <a href="assets/docs/resume.pdf" target="_blank">here</a>. 
</p>


<p>
  Email:  
  <span style="font-family: 'Courier New', Courier, monospace;">
    reach dot firstname at  gmail dot com / firstname at  isical dot ac dot in
  </span>
</p>

Feel free to reach me at <img src="assets/email.png" alt="Email Address" style="vertical-align: middle;"> 

-->

</section>



