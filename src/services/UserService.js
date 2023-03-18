import axios from "axios";

const UserService = {
  // Getting Api for User List
  getUsersList: async function (page) {
    try {
      let url;
      if ((page !== null) & (page > 1)) {
        url = `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/8`;
      } else {
        url =
          "http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/1/20";
      }
      const response = await axios.get(url);
      return this.addRandomnessToImages(response.data.list);
    } catch (error) {
      throw error;
    }
  },
  // Getting Api for each User
  getUser: async function (id) {
    try {
      let url = `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  // Getting Api for Friend List
  getFriendList: async function (id, page) {
    try {
      let url;
      if ((page !== null) & (page > 1)) {
        url = `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/${page}/8`;
      } else {
        url = `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/${page}/20`;
      }
      const response = await axios.get(url);
      return this.addRandomnessToImages(response.data.list);
    } catch (error) {
      throw error;
    }
  },
  // Randomize image for users
  addRandomnessToImages: function (items) {
    return items.map((item) => ({
      ...item,
      imageUrl: item.imageUrl + "?v" + item.id,
    }));
  },
};

export default UserService;
