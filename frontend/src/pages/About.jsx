import css from "./Styles/About.module.css";

export default function About() {
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div className={css.header}>
          <h1>About me</h1>
        </div>
        <div className={css.contents}>
          <div className={css.text}>
            <p>
              I am passionate about capturing the beauty of the world through
              my lense and bringing those moments to life in your living
              space. I specialize in high-quality wall prints of stunning ocean
              waves and mesmerizing nature scenes, meticulously curated to
              elevate any room's ambiance. My journey began with a simple
              fascination for photography and a deep-rooted love for exploring
              the world's wonders. Over the years, I've honed my craft,
              mastering the art of composition, lighting, and storytelling
              through every click of the shutter. Each print in my collection
              is a testament to my dedication to capturing the essence of my
              surroundings and sharing it with you.
            </p>
          </div>
          <div className={css.imageContainer}>
            <img src="./IMG_6267.jpg" alt="" />
          </div>
        </div>
        <div className={css.bottomText}>
          <p>
            What sets me apart is not just my eye for aesthetics but also my
            commitment to quality. We meticulously select premium materials for
            my prints, ensuring vibrant colors, sharp details, and long-lasting
            durability. Whether you're seeking a serene landscape to add
            tranquility to your bedroom or a dynamic cityscape to inspire
            creativity in your workspace, our prints are designed to evoke
            emotions and spark imagination. <br/><br/>We're incredibly grateful for the
            opportunity to share our passion with you and to be a part of your
            journey in creating a space that reflects your unique style and
            personality. Thank you for visiting my gallery, where every
            print tells a story, and every wall becomes a canvas for adventure.
            Explore my collection today and let my prints transform your space.<br/><br/> With gratitude,<br/><br/> Kai
          </p>
          <div className={css.imageContainer2}>
            <img src="./IMG_9061.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
