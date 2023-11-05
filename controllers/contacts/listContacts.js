import Contact from "#service/schemas/contacts.js";

export const listContacts = async (req, res, next) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    const favorite = req.query.favorite || "";
    //Contact.find({ favorite });

    let option = {
      page: page,
      limit: limit,
    };

    if (page === undefined || limit === undefined)
      option = {
        pagination: false,
      };

    //{pagination: false,}

    const resultsPaginateFav = (favorite) => {
      if (favorite != "") return Contact.paginate({ favorite }, option);
      return Contact.paginate({}, option);
    };
    const results = await resultsPaginateFav(favorite);

    return res.status(200).json({
      results,
    });
  } catch (err) {
    return res.status(500).json(`An error occurred: ${err}`);
  }
};
