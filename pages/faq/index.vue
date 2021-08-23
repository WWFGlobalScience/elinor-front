<template>
  <article class="page page--flushed">
    <section class="section section--main">
      <img src="~/assets/img/faq-section.jpg" />
    </section>
    <section class="section">
      <div class="container">
        <h1 class="c-title--main">FAQ's</h1>
        <div class="grid grid-cols-5 gap-14 flex items-center">
          <div class="col-span-4 md:col-span-5">
            <div class="elinor-card--question">
              <span class="elinor-card--question__number"> 1 </span>
              <div class="elinor-card--question__info">
                <h4 class="c-title--md">
                  What is the main purpose of the tool?
                </h4>
                <p>
                  The main purpose of this tool is to help conservationists
                  working in managed and conserved areas to easily track
                  components critical to the success of area-based conservation
                  over time, and share this information with decision makers and
                  conservation supporters working at national or international
                  scales.
                </p>
                <p>
                  The tool was specifically designed knowing many conservation
                  practitioners (1) are familiar with and use an adopted version
                  for the METT in their work and (2) face budget and time
                  constraints for conservation monitoring and evaluation, and
                  finally, (3) have minimal capacity to identify metrics that
                  are (a) grounded in social science (b) useful for local
                  adaptive management while also being (c) relevant for global
                  research and decision-making.
                </p>
                <p>
                  Because of this, this low-cost and simple assessment has been
                  developed collaboratively with members of the conservation
                  community over two years, building on existing tools and
                  resources (see reference list), and focuses on covering a
                  range of management and governance issues considered important
                  to success rather than going in-depth in one particular area.
                </p>
              </div>
            </div>
          </div>
          <div class="col-span-1 md:col-span-5"></div>
        </div>

        <div class="grid grid-cols-5 gap-14 flex items-center">
          <div class="col-span-4 md:col-span-5">
            <div class="elinor-card--question">
              <span class="elinor-card--question__number"> 2 </span>
              <div class="elinor-card--question__info">
                <h4 class="c-title--md">
                  What kinds of decisions will this tool help inform?
                </h4>
                <p>
                  For project and site managers, information from the assessment
                  can help identify where a more in-depth assessment of
                  management, governance, equity, or climate is needed in a
                  particular site. When resources for more comprehensive
                  governance or management assessments are not available,
                  insights from this tool help project teams make decisions
                  about what activities to carry out.
                </p>
                <p>
                  For regional and international decision-makers, the tool can
                  help provide a broad overview of perceived status and trends
                  in management and governance and help identify areas for
                  future regional-level research. Decision-makers might come
                  from different types of organizations, and may include NGO or
                  government staff, consultants, and researchers.
                </p>
              </div>
            </div>
          </div>
          <div class="col-span-1 md:col-span-5"></div>
        </div>
        <!--atention: here the grid changes-->
        <div class="grid grid-cols-5 gap-14 flex items-center">
          <div class="col-span-3 md:col-span-5">
            <div class="elinor-card--question">
              <span class="elinor-card--question__number"> 3 </span>
              <div class="elinor-card--question__info">
                <h4 class="c-title--md">Who should fill out this tool?</h4>
                <p>
                  The target user (who will input information in the tool) is a
                  conservation stakeholder who is knowledgeable about the
                  management and governance of a managed or conserved area.
                  Oftentimes this person will be a staff member at a
                  conservation NGO but may also be natural resource users and
                  other individuals from Indigenous Peoples, local communities,
                  and private entities.
                </p>
                <p>
                  The target user should consult other stakeholders or resources
                  when filling out the tool. If the target user has more time
                  and resources, it’s possible to use this tool as a focus group
                  instrument, and invite a relevant group of stakeholders to
                  review and answer questions together. You can download the
                  facilitation guide here with tips on research ethics and
                  facilitation should you choose to take this path.
                </p>
              </div>
            </div>
          </div>
          <div class="col-span-2 md:col-span-5">
            <div class="elinor-card__detail">
              <p>
                Consultation is a prerequisite to success! Consulting with a
                range of stakeholders will increase the legitimacy of the tool.
                It is also a quick and easy way to include stakeholders in part
                of the planning and decision-making process for the MA.
              </p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-5 gap-14 flex items-center">
          <div class="col-span-4 md:col-span-5">
            <div class="elinor-card--question">
              <span class="elinor-card--question__number"> 4 </span>
              <div class="elinor-card--question__info">
                <h4 class="c-title--md">
                  I already use the METT (or a modified version of the METT) in
                  my projects - do I have to stop and use this tool now?
                </h4>
                <p>
                  Not necessarily. This tool was designed to mirror the METT as
                  closely as possible, so data collected using the METT could
                  inform inputs into the Elinor tool and database. For example,
                  if you use the METT for evalu
                  <strong>conservation and management</strong>:
                </p>
                <p>
                  1. Clearly defined rights and decision making; 2. Inclusive
                  and equitable management; 3. Transparency and accountability;
                  4. Monitoring and enforcement; 5. Clear and congruent
                  regulations; 6. Resource boundaries; 7. Perceived outcomes; 8.
                  Capacity for adaptive management; 9. Operational capacity.
                </p>
                <p>
                  The data system will also allow tool users to append relevant
                  documents like management plans and geospatial files to
                  facilitate knowledge management and sharing across spatial
                  scales and access decision-friendly visualizations of
                  site-level data and aggregate data.
                </p>
              </div>
            </div>
          </div>
          <div class="col-span-1 md:col-span-5"></div>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
export default {
  name: "faq",
};
</script>