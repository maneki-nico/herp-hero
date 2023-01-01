import React from "react"
import photo from '../../../assets/images/current-me.jpeg'

const AboutTheDeveloper = () => {
  return (
    <div className="about-developer card-section grid-x grid-margin-x">
      <div className="cell small-6">
        <img className="developer-portrait" src={photo} alt="Portrait of Nico Foti"></img>
      </div>
      <div className="cell auto">
        <h1>About the Developer</h1>
        <p>A recent Launch Academy graduate, Nico Foti is a web developer 
          with a love for animals (especially reptiles) and all things art. 
          In their free time, they enjoy spending time with their cat and snakes,
          making clay sculptures, painting, learning new things and, of course, coding!
          <br></br>
          <br></br>
          You can find them at <a href="https://github.com/maneki-nico">GitHub </a>
          and <a href="https://www.linkedin.com/in/nicofoti/">LinkedIn</a>.
        </p> 
      </div>
    </div>
  )
}

export default AboutTheDeveloper