import { useActionState } from "react";
export function NewOpinion() {

  function submitAction(formData) {
    const userName = formData.get("userName");
    const title = formData.get("title");
    const opinion = formData.get("opinion");
    //define array to push the errors
    let errors = [];

    if (!userName.trim().length === 0) {
      errors.push("Please enter the valid userName");
    }

    if (!title.trim().length < 5) {
      errors.push("Please enter the proper email");
    }

    if (!opinion.trim().length < 10 && !opinion.trim().length > 300) {
      errors.push(
        "Please enter the opinion which has the charachters between 10 and 300"
      );
    }

    if (errors.length > 0) {
      return {
        errors,
        enteredValues: {
          userName,
          title,
          opinion,
        },
      };
    }
    return { errors: null };
  }

 const [formState, formAction] = useActionState(submitAction , {errors:null})
  return (
    <div id="new-opinion" action={formAction}>
      <h2>Share your opinion!</h2>
      <form>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input type="text" id="userName" name="userName" defaultValue={formState.enteredValues?.userName}/>
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" defaultValue={formState.enteredValues?.title}/>
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea id="body" name="body" rows={5} defaultValue={formState.enteredValues?.opinion}></textarea>
        </p>

        {
          formState.errors && (
            <ul className="errors">
              {formState.errors.map((error)=>(
                <li key={error}>{error}</li>
              ))}
            </ul>
          )
        }

        <p className="actions">
          <button type="submit">Submit</button>
        </p>
      </form>
    </div>
  );
}
