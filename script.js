function Puppy(name, breed) {
  this.name = name
  this.breed = breed
}

var model = {
  init: function() {
    var puppies = []
  },

  addPuppyToList: function() {
    model.puppies.push(new Puppy())
  }
};

var controller = {
  init: function() {
    view.submitButtonListener()
  },

  submitButtonHandler: function(e) {
    console.log("asdf")
    e.preventDefault();

    var puppyName = view.getPuppyName();
    var puppyBreed = view.getPuppyBreed();

    if(puppyName) {
      model.addPuppyToList(puppyName, puppyBreed)
    }
  }
};

var view = {

  submitButtonListener: function() {

    $("#submit-button").on("click", controller.submitButtonHandler)
  },

  getPuppyName: function() {
    return $("#puppy-name").val()
  },

  getPuppyBreed: function() {
    return $("select").val()
  }
};

$(document).ready(function() {
  controller.init();
})