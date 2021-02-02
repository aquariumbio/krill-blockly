# Krill Blockly

A not-entirely-reasonable idea of how protocol writing Aquarium protocols should be. Based on [Google's Blockly](https://developers.google.com/blockly/). 

## Goals
Aquarium protocols are written in Krill, a Ruby DSL. While this allows the protocol developer to do nearly anything, the language is easily not approachable for the vast majority of potential users who know a great deal about biology protocols but nothing about programming in Ruby. 

The purpose of this project is to create a prototype visual progamming language that contains sufficient high-level methods for biologists to compose useful protocols, but does not require any real coding experience. I aim for this project to: 
- Be based on a tried and true, extensible visual code editor
- Produce working protocol code
- Constrain protocol complexity and need for coding skills
- Provide a framework for testing the usability and completeness of [krill libraries](https://github.com/aquariumbio/protocol-base) with non-coders

## Use
Clone this repo and launch `tests/playgrounds/advanced_playground.html`. Krill blocks are defined in `tests/playgrounds/krill_generator.js`

<img src="/tests/playgrounds/blockly_to_krill.png" alt="Blockly to Krill" width="750"/>
