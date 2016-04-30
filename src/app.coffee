device = new Framer.DeviceView();
InputModule = require "input"

device.setupContext()
device.deviceType = "google-nexus-6p"
device.contentScale = 4

APIURL = 'https://api.github.com/users/'

app = Framer.Importer.load('app.framer/imported/app@1x')

bg = new BackgroundLayer
  backgroundColor: "grey"

input = new InputModule.Input
    setup: false # Change to true when positioning the input so you can see it
    virtualKeyboard: true # Enable or disable virtual keyboard for when viewing on computer
    text: "Bergets"
    placeholder: "Username"
    placeholderColor: "#000"
    backgroundColor: "#eee"
    type: "text" # Use any of the available HTML input types. Take into account that on the computer the same keyboard image will appear regarding the type used.
    y: 8
    x: 8
    width: device.screen.width / 4 - 35
    height: 25
    goButton: false # Set true here in order to use "Go" instead of "Return" as button (only works on real devices)

input.on "keyup", ->
  name = (@value)
  getData(name)


layerA = new Layer
    y: 300
    x: 8
    width: device.screen.width / 4 - 16
    html: 'Public repos: '+ '<br> 5' + '<br> Followers: ' + '0' + '<br> Following: ' + '0'
    backgroundColor: "none"
    style: {
      "font-size": "22px"
      "text-align": "center"
      "padding": "16px"
      "color": "#333"
    }

avatar = new Layer
  image: 'https://avatars.githubusercontent.com/u/4188549?v=3'
  midX: device.screen.width / 2 / 4
  y: 80

getData = (username) ->
  GETDATA = APIURL + username
  jsondata = JSON.parse Utils.domLoadDataSync GETDATA
  layerA.html = 'Public repos: '+jsondata.public_repos + '<br> Followers: ' + jsondata.followers + '<br> Following: ' + jsondata.following
  avatar.image = jsondata.avatar_url

app.heart.states.add
    pressed:
        y: 550

app.heartBg.states.add
  pressed:
    opacity: 1
    y: -3
  notpressed:
    opacity: 0

app.heart.states.animationOptions =
  curve: "spring(100, 10, 0)"

app.heartBg.states.animationOptions =
  curve: "spring(100, 10, 0)"

app.heartBg.opacity = 0

app.heart.on Events.Tap, (event, layer) ->
  app.heartBg.states.switch("pressed")
  app.heart.states.switch("pressed")
  Utils.delay 0.5, ->
    app.heartBg.states.switch("default")
    app.heart.states.switch("default")

app.heartBg.on Event.Tap, ->
  app.heartBg.state.switch("notpressed")
