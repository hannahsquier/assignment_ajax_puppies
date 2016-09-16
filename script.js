function Puppy(name, breed, created_at) {
  this.name = name;
  this.breed = breed;
  this.created_at = created_at;
}

function Breed(name, id){
  this.name = name
  this.id = id
}

var model = {
  init: function() {
    this.puppies = [];
    this.breeds = [];
  },

  addPuppyToList: function(puppyName, puppyBreed, created_at) {
    model.puppies.push(new Puppy(puppyName, puppyBreed, created_at));
  },

  createPuppyList: function(response) {
    model.puppies = [];
    for(var puppy in response) {
      model.addPuppyToList(response[puppy].name, response[puppy].breed, response[puppy].created_at);
    }
  },

  createBreedList: function(response) {
    model.breeds = [];
    for(var breed in response) {
     model.breeds.push(new Breed(response[breed].name, response[breed].id));
    }
  }
};

var controller = {
  init: function() {
    API.getBreeds();
    API.getPuppyList();
    view.submitButtonListener();
    view.refreshListener();
    model.init();
  },

  submitButtonHandler: function(e) {
    e.preventDefault();

    var puppyName = view.getPuppyName();
    var breedID = view.getPuppyBreedID();

    if(puppyName) {
      API.sendPuppy(puppyName, breedID)
     // model.addPuppyToList(puppyName, puppyBreed);
    }
  }
};

var view = {

  submitButtonListener: function() {

    $("#submit-button").on("click", controller.submitButtonHandler)
  },

  refreshListener: function() {
    $("#refresh").on("click", API.getPuppyList)
  },

  getPuppyName: function() {
    return $("#puppy-name").val();
  },

  getPuppyBreedID: function() {
    return $("select").val();
  },

  render: function(puppyList, breedList) {
    $select = $("select")
    for(b in breedList) {
      $option = $("<option>")
      $option.text(breedList[b].name)
            .val(breedList[b].id)
      $select.append($option)
    }

    $list = $('#puppy-list');
    var now = new Date();

    for (var puppy in puppyList) {
      var creationDate = new Date(puppyList[puppy].created_at);
      $newli = $('<li></li>')
        .text(puppyList[puppy].name + " (" + puppyList[puppy].breed.name + "), created " + ((now - creationDate) / 1000 / 60)  + " minutes ago.");
      $list.append( $newli );
    }
  }
};

var API = {
  getPuppyList: function() {
    var puppyPromise =  $.ajax({ url: "https://ajax-puppies.herokuapp.com/puppies.json",
                                success: function(response) {
                                  model.createPuppyList(response);
                                  view.render(model.puppies, model.breeds);
                                }
                              });

    return puppyPromise;
  },

  getBreeds: function() {
    var breedPromise =  $.ajax({ url: "https://ajax-puppies.herokuapp.com/breeds.json",
                                success: function(response) {
                                  model.createBreedList(response);
                                  // view.render(model.puppies);
                                }
                              });
  },

  sendPuppy: function(name, breedID) {

    options = {
      url: 'https://ajax-puppies.herokuapp.com/puppies.json',
      method: 'POST',
      contentType: 'application/json',
      dataType: "json",
      data: JSON.stringify({name: name, breed_id: breedID}),
      success: function() { alert("Thanks for your puppy submission!")},
      error: function() { alert("Oops something went wrong!")}

    }

    $.ajax(options)

    //var puppyPromise =
  }


};

$(document).ready(function() {
  controller.init();

  console.log(API.getPuppyList())
  console.log(model.puppies)
})