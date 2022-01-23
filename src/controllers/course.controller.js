const express = require("express");
const router = express.Router();
const client = require("../configs/redis");

const Course = require("../models/course.model");

router.post("", async (req, res) => {
  try {
    const course = await Course.create(req.body);


    const courses = await Course.find().lean().exec();

    client.set("courses", JSON.stringify(courses));
    return res.send(course);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.get("", async (req, res) => {
    try {
      client.get("courses", async (err, courses) => {
        if (err) return res.status(500).send({ message: "Failed" });
        if (courses) {
          return res
            .status(300)
            .send({ courses: JSON.parse(courses), redis: true });
        } else {
          const courses = await Course.find().lean().exec();
          client.set("courses", JSON.stringify(courses));
          return res.status(200).send({ courses: courses, redis: false });
        }
      });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });
  
  router.get("/search", async (req, res) => {
    try {
      const queries = req.query;
  
      var value = "";
      for (k in queries) {
        value = value + queries[k];
      }
  
      client.get(value, async (err, courses) => {
        if (err) return res.status(500).send(err);
  
        if (courses) {
          return res
            .status(300)
            .send({ courses: JSON.parse(courses), redis: true });
        } else {
          const courses = await Course.find(queries).lean().exec();
          client.set(value, JSON.stringify(courses));
          return res.status(200).send({ courses: courses, redis: false });
        }
      });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      client.get(`course.${req.params.id}`, async (err, course) => {
        if (err) return res.status(500).send(err);
  
        if (course) {
          return res
            .status(300)
            .send({ courses: JSON.parse(course), redis: true });
        }
        const get_course = await Course.findById(req.params.id).lean().exec();
        client.set(`course.${req.params.id}`, JSON.stringify(get_course));
  
        return res.status(200).send({ courses: get_course, redis: false });
      });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });
  
  router.patch("/:id", async (req, res) => {
    try {
      client.get(`course.${req.params.id}`, async (err, course) => {
        if (err) return res.status(500).send(err);
  
        if (course) {
          client.del(`course.id`);
        }
        const toBeUpdated = await Course.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );
  
        const courses = await Course.find().lean().exec();
  
        client.set(`course.${req.params.id}`, JSON.stringify(toBeUpdated));
  
        client.set("courses", JSON.stringify(courses));
  
        return res.status(201).send({ courses: toBeUpdated, redis: false });
      });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      client.get(`course.${req.params.id}`, async (err, course) => {
        if (err) return res.status(500).send(err);
  
        if (course) {
          client.del(`course.${req.params.id}`);
        }
  
        const get_course = await Course.findByIdAndDelete(req.params.id);
  
        const courses = await Course.find().lean().exec();
  
        client.set("courses", JSON.stringify(courses));
  
        return res.status(200).send({ courses: get_course, redis: false });
      });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });
  
module.exports=router;  
