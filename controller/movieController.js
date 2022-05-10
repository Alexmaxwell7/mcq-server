const Movie = require("../models/movie");
const to = require("await-to-js").default;
const mongoose = require("mongoose");
//get employee details
exports.getMovieList = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let movie, err;
    [err, movie] = await to(Movie.find());
    if (err) {
      return res.status(500).json({ "Error ": err });
    }
    return res.status(200).json(movie);
  };

  exports.getMovieById = async (request, response) => {
    response.header("Access-Control-Allow-Origin", "*");
    try{
        const user = await Movie.findById(request.params.id);
        response.status(200).json(user);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
}
  
  //create employee controller
  exports.createMovie = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("requested body", req.body);
    let err, data, movie;
    if (!req.body.id) {
        movie = new Movie(req.body);
        movie.id = movie._id;
      [err, data] = await to(movie.save());
      if (err) {
        return res.status(400).json({
          ERROR: "Something happening during creation of Expenses",
        });
      }
      if (data) {
        console.log("data", data);
        return res.status(200).json({
          SUCCESS: "Movie setup creation successful",
          id: data._id,
        });
      } else {
        return res.status(400).json({
          ERROR: "Movie creation unsuccessful",
        });
      }
    } else {
      movie = req.body;
      [err, data] = await to(
        Movie.findOneAndUpdate({ _id: req.body.id }, req.body)
      );
  
      if (err) {
        return res.status(400).json({
          ERROR: "Something happening during Updation of Employee",
        });
      }
  
      if (data) {
        return res.status(200).json({
          SUCCESS: "Movie Updated successful",
          id: req.body.id,
        });
      } else {
        return res.status(404).json({
          ERROR: "Movie Not Found",
        });
      }
    }
  };
  //deleteExpenses_data controller
  exports.deleteMovie = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let movie;
    [err, movie] = await to(
      Movie.findOneAndDelete(
        { _id: mongoose.Types.ObjectId(req.params.id) },
        req.body
      )
    );
    if (err) {
      return res.status(500).json({ Error: err });
    }
    return res.status(200).json({"successfull delete":movie});
  };
