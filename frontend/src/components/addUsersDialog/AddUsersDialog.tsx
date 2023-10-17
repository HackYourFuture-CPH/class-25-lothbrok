import { Autocomplete, Button, CircularProgress, Dialog, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { User } from '../../types/User';
import api from '../../api';
import styles from './addUsersDialog.module.css';

const AddUsersDialog = ({
  allowedUsers,
  setAddUsers,
  addUsers,
  projectId,
}: {
  allowedUsers: string[] | undefined;
  setAddUsers: React.Dispatch<React.SetStateAction<boolean>>;
  addUsers: boolean;
  projectId: string | undefined;
}) => {
  const [users, setUsers] = useState<User[]>();
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  console.log(users);
  useEffect(() => {
    const fetchAndSetUsers = async () => {
      try {
        const req = await api();
        const res = await req.get('/user');
        const users: User[] = await res.data;
        const filteredUsers = users.filter((user) => !allowedUsers?.includes(user.uid));
        setUsers(filteredUsers);
      } catch (e) {
        console.error(e);
      }
    };
    fetchAndSetUsers();
  }, []);

  const inviteUsers = async () => {
    try {
      const uids = selectedUsers.map((user) => user.uid);
      const data = {
        uids: uids,
      };
      const req = await api();
      await req.post(`project/${projectId}/invite-users`, data);
      setAddUsers(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Dialog open={addUsers} onClose={() => setAddUsers(false)}>
      <div className={styles.dialog}>
        <h3>Add More Users To This Project</h3>
        {users ? (
          users.length === 0 ? (
            <p>No users available</p>
          ) : (
            <Autocomplete
              multiple
              options={users}
              value={selectedUsers}
              defaultValue={selectedUsers}
              getOptionLabel={(option) =>
                option ? `${option.first_name} ${option.last_name}` : ''
              }
              onChange={(e, addedUser) => {
                setSelectedUsers(addedUser);
              }}
              filterSelectedOptions
              renderInput={(params) => <TextField {...params} />}
            />
          )
        ) : (
          <CircularProgress />
        )}
        <Button onClick={inviteUsers}>Add Users</Button>
      </div>
    </Dialog>
  );
};

export default AddUsersDialog;
