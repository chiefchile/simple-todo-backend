module.exports = {
	SUCCESS: {code: 0, msg: "Success"},
	SAVE_ERR: { code: -1, msg: "Error saving" },
	FIND_NOTE_ERR: { code: -2, msg: "Error querying" },
	UPDATE_NOTE_ERR: { code: -3, msg: "Error updating" },
	DELETE_NOTE_ERR: { code: -4, msg: "Error deleting" },
	FIND_TITLES_ERR: { code: -5, msg: "Error querying titles" },
	NO_NOTE_UPDATED_ERR: {code: -6, msg: "No record updated"},
	NO_NOTE_DELETED_ERR: {code: -7, msg: "No record deleted"}
};
