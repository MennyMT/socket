/**
 * WorkerController
 *
 * @description :: Server-side logic for managing workers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
    print : (req,res) => {
        let the_data = req.params.all()

        // for the part of the test that asked to treat every type of user diffrently
        // we didnt got the user types that can be used so it is fake for now.
        if(the_data.user_id != 'undifined' && the_data.user_type != 'undifined'){
            const switch_type = the_data.user_type;
            switch (switch_type) {
                case "x":
                    // do somthing for user type x
                    break;
                case "y":
                    // do somthing for user type y
                    break;
                default:
                    // do what we always do
            }
        }
        
        // here we fix the data so we can use it in the dash and we return it to the view
        if(the_data.user_id != 'undifined'){
            const user_id = the_data.user_id;
            const user_type = the_data.user_type;

            delete the_data.user_id;
            delete the_data.user_type;

            const message = the_data;

            const fixed_data = {
                user_id: user_id,
                user_type: user_type,
                message: message
            }

            // sending to the dashbord for realtime updates
            sails.controllers.chat.addToLog(fixed_data);

            // sending the params to the view
            return res.view("print",fixed_data);
        }
        
    }
};

