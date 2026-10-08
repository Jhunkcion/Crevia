const PROJECTS = [
  {
    className: "gridy-2 gridyhe-1",
    title: "Item Title",
    time: "17:22 17th Feb 2015",
    who: "Bruce Wayne",
    excerpt: "Lorem ipsum dolor set amet, some dummy content..",
  },
  {
    className: "gridy-1 gridyhe-1",
    title: "Item Title",
    time: "17:22 17th Feb 2015",
    who: "Harvey Dent",
    excerpt: "Lorem ipsum dolor set amet, some dummy content..",
  },
  {
    className: "gridy-1 gridyhe-2",
    title: "Item Title",
    time: "17:22 17th Feb 2015",
    who: "Clark Kent",
    excerpt: "Lorem ipsum dolor set amet, some dummy content..",
  },
  {
    className: "gridy-2 gridyhe-1",
    title: "Item Title",
    time: "17:22 17th Feb 2015",
    who: "Tony Stark",
    excerpt: "Lorem ipsum dolor set amet, some dummy content..",
  },
  {
    className: "gridy-1 gridyhe-1",
    title: "Item Title",
    time: "17:22 17th Feb 2015",
    who: "Steve Rogers",
    excerpt: "Lorem ipsum dolor set amet, some dummy content..",
  },
  {
    className: "gridy-1 gridyhe-1",
    title: "Item Title",
    time: "17:22 17th Feb 2015",
    who: "Natasha Romanoff",
    excerpt: "Lorem ipsum dolor set amet, some dummy content..",
  },
];

export default function Work() {
  return (
    <section id="work" className="relative w-full">
      <div className="gridywrap">
        {PROJECTS.map((item, index) => (
          <div key={index} className={item.className}>
            <div
              className="gridimg"
              style={{ backgroundImage: "url(/project-bg.png)" }}
            >
              &nbsp;
            </div>

            <div className="gridinfo">
              <h3>{item.title}</h3>
              <div className="gridmeta">
                <p className="gridwhen">
                  <i className="fa fa-clock-o"></i> {item.time}
                </p>
                <p className="gridwho">
                  <i className="fa fa-user"></i> {item.who}
                </p>
              </div>
              <p className="gridexerpt">{item.excerpt}</p>
              <a href="#" className="grid-btn grid-more">
                <span>More</span> <i className="fa fa-plus"></i>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}