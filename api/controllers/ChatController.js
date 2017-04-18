/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	joinDash: (req, res) => {
        if (req.isSocket) {
            // subscribe client to model changes
            Chat.watch(req.socket);
            console.log('User subscribed to ' + req.socket.id);
        }
    },

    addToLog: (data) => {
        // making the call to publish
        Chat.create(data)
                .exec(function(error, data) {
                    if(data){
                        Chat.publishCreate({
                            id: data.id,
                            user_id: data.user_id, 
                            user_type: data.user_type,
                            message: data.message
                        });
                    }
                    return true;
                });
    }
};

