import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";

const StoryForm = ({ setGetStories }) => {
  const [auth] = useAuth();
  const [loading, setLoading] = useState(false);
  const [storyForm, setStoryForm] = useState({
    url: null,
    type: null,
    duration: null,
    heading: null,
    subheading: null
  });

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      let { url, type, duration, heading, subheading } = storyForm;
      let profileImage = `${process.env.API}/api/v1/auth/user-image/${auth?.user?._id}`;
      if (
        !url ||
        !profileImage ||
        !type ||
        !duration ||
        !heading ||
        !subheading
      ) {
        toast.error("All Fields Are Required");
        setLoading(false);
        return false;
      }

      if (url.includes(",") && url.startsWith(",")) {
        toast.error("Url Should'nt start with (,)");
        setLoading(false);
        return false;
      }

      if (
        (url.includes(",") && url.endsWith(",")) ||
        (url.includes(",") && url.endsWith(", "))
      ) {
        toast.error("Url Should'nt ends with (,) or (, )");
        setLoading(false);
        return false;
      }

      if (type.includes(",") && type.startsWith(",")) {
        toast.error("Type Should'nt start with (,)");
        setLoading(false);
        return false;
      }

      if (
        (type.includes(",") && type.endsWith(",")) ||
        (type.includes(",") && type.endsWith(", "))
      ) {
        toast.error("Type Should'nt ends with (,) or (, )");
        setLoading(false);
        return false;
      }

      if (duration.includes(",") && duration.startsWith(",")) {
        toast.error("Duration Should'nt start with (,)");
        setLoading(false);
        return false;
      }

      if (
        (duration.includes(",") && duration.endsWith(",")) ||
        (duration.includes(",") && duration.endsWith(", "))
      ) {
        toast.error("Duration Should'nt ends with (,) or (, )");
        setLoading(false);
        return false;
      }

      if (heading.includes(",") && heading.startsWith(",")) {
        toast.error("Heading Should'nt start with (,)");
        setLoading(false);
        return false;
      }

      if (
        (heading.includes(",") && heading.endsWith(",")) ||
        (heading.includes(",") && heading.endsWith(", "))
      ) {
        toast.error("Heading Should'nt ends with (,) or (, )");
        setLoading(false);
        return false;
      }

      if (subheading.includes(",") && subheading.startsWith(",")) {
        toast.error("subHeading Should'nt start with (,)");
        setLoading(false);
        return false;
      }

      if (
        (subheading.includes(",") && subheading.endsWith(",")) ||
        (subheading.includes(",") && subheading.endsWith(", "))
      ) {
        toast.error("subHeading Should'nt ends with (,) or (, )");
        setLoading(false);
        return false;
      }

      url = url.includes(",") ? url.split(",") : url;
      heading = heading.includes(",") ? heading.split(",") : heading;
      subheading = subheading.includes(",")
        ? subheading.split(",")
        : subheading;
      type = type.includes(",") ? type.split(",") : type;
      duration = duration.includes(",") ? duration.split(",") : duration;

      let story = [];
      let i = 0;

      if (Array.isArray(url)) {
        while (i < url.length) {
          story.push({
            url: url[i],
            type: type[i],
            duration: duration[i],
            header: {
              heading: heading[i],
              subheading: subheading[i],
              profileImage: profileImage
            }
          });

          i++;
        }
      } else {
        while (i < 1) {
          story.push({
            url: url,
            type: type,
            duration: duration,
            header: {
              heading: heading,
              subheading: subheading,
              profileImage: profileImage
            }
          });

          i++;
        }
      }

      const { data } = await axios.post(
        `${process.env.API}/api/v1/stories/create/${auth?.user?._id}`,
        {
          story: story
        }
      );

      if (data.success) {
        setGetStories((prev) => !prev);
        toast.success(data.message);
        setStoryForm((prev) => {
          return {
            ...prev,
            url: "",
            duration: "",
            heading: "",
            subHeading: "",
            type: ""
          };
        });
        setLoading(false);
      } else {
        toast.error(data.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid mt-4 mb-5">
      <div className="row">
        <div className="col-md-12">
          <form onSubmit={handleSubmit}>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Story Image Url (Type one Or More Than One Separeted With (,))
              </label>
              <textarea
                value={storyForm.url}
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={({ target }) =>
                  setStoryForm((prev) => {
                    return { ...prev, url: target.value };
                  })
                }
              />
            </div>

            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Duration in milisecond in (Type one Or More Than One Separeted
                With (,) eg (1400,1500))
              </label>
              <textarea
                value={storyForm.duration}
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={({ target }) =>
                  setStoryForm((prev) => {
                    return { ...prev, duration: target.value };
                  })
                }
              />
            </div>

            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                type (image or video) (Type one Or More Than One Separeted With
                (,) eg (image,video))
              </label>
              <textarea
                value={storyForm.type}
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={({ target }) =>
                  setStoryForm((prev) => {
                    return { ...prev, type: target.value };
                  })
                }
              />
            </div>

            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Story Heading Text (Type one Or More Than One Separeted With
                (,))
              </label>
              <textarea
                value={storyForm.heading}
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={({ target }) =>
                  setStoryForm((prev) => {
                    return { ...prev, heading: target.value };
                  })
                }
              />
            </div>

            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Story SubHeading Text (Type one Or More Than One Separeted With
                (,))
              </label>
              <textarea
                value={storyForm.subheading}
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={({ target }) =>
                  setStoryForm((prev) => {
                    return { ...prev, subheading: target.value };
                  })
                }
              />
            </div>

            <div class="col-12">
              <button disabled={loading} class="btn btn-danger" type="submit">
                Create Your Story
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StoryForm;
