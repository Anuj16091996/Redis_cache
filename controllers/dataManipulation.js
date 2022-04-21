exports.validateJSON = (Resposne, sortBy, direction, tag) => {
  const finalJSON = {
    status: false,
    message: "",
    post: [],
  };
  let conditionone = false;
  let conditiontwo = false;
  const sortByAllAcceptance = ["id", "reads", "likes", "popularity"];
  const directionAllAcceptance = ["desc", "asc"];
  conditionone = sortByAllAcceptance.includes(sortBy.toLowerCase());
  conditiontwo = directionAllAcceptance.includes(direction.toLowerCase());

  if (!conditionone) {
    finalJSON.message = "sortBy parameter is invalid";
    return finalJSON;
  } else if (!conditiontwo) {
    finalJSON.message = "direction parameter is invalid";
    return finalJSON;
  }

  Resposne[0].map((values) => {
    let bool = tag.every((result) => values.tags.includes(result));
    if (bool) finalJSON.post.push(values);
  });
  if (finalJSON.post.length != 0) {
    const sortdata = this.sortJSON(finalJSON, sortBy, direction);
    finalJSON.post = sortdata;
    return finalJSON;
  } else {
    finalJSON.message = "Tags parameter is required";
    return finalJSON;
  }
};

exports.sortJSON = (object, sortBy, direction) => {
  object.post.sort((a, b) => {
    if (direction == "asc") {
      return a[sortBy] - b[sortBy];
    } else {
      return b[sortBy] - a[sortBy];
    }
  });
  return object.post;
};
