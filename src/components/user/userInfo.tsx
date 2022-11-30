import { Box, Button, Container } from "@material-ui/core";
import { Stack } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useUserDetail } from "../hooks/useUserDetail";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import agent from "../../api/agent";
import TextField from "@mui/material/TextField";
import { useIntl } from "react-intl";
import User from "../types/user";

const UserInfo: React.FC = ({}) => {
  const parm = useParams();
  const { formatMessage } = useIntl();
  const { currentUser, getUserById, addUserItem, updateUserItem } =
    useUserDetail();

  const [id, setId] = useState(parm.id ? parseInt(parm.id) : 0);
  const [birthday, setValue] = React.useState<Dayjs | null>(
    dayjs(currentUser.birthday)
  );
  const [name, setName] = useState<string>(currentUser.name);
  const [age, setAge] = useState<number>(currentUser.age);
  const [user, setUser] = useState<User>(currentUser);
  useEffect(() => {
    agent.UserAgent.getUserById(id).then((res: User) => {
      setUser(res);
      setName(res.name);
      setAge(res.age);
      setValue(dayjs(res.birthday));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setUser({
      name: name,
      age: age,
      birthday: birthday?.format("MM/DD/YYYY") || "",
      id: id,
    });
  }, [name, age, birthday, id]);

  const navigate = useNavigate();

  const hanldAddNewRow = () => {
    addUserItem(user);
    navigate("/userList");
  };

  const hanldUpdateRow = () => {
    updateUserItem(id, user);
    navigate("/userList");
  };

  const usernameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setName(event.target.value);
  };
  const userageChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAge(+event.target.value);
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label={formatMessage({ id: "name" })}
            name="name"
            autoFocus
            value={name}
            onChange={usernameChangeHandler}
            variant="outlined"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="age"
            autoFocus
            label={formatMessage({ id: "age" })}
            type="number"
            id="age"
            onChange={userageChangeHandler}
            value={age}
            variant="outlined"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
              <DesktopDatePicker
                label="Date desktop"
                inputFormat="MM/DD/YYYY"
                value={birthday}
                onChange={setValue}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
          {user.id != 0 && (
            <Button onClick={hanldUpdateRow} fullWidth variant="contained">
              Update
            </Button>
          )}
          {user.id == 0 && (
            <Button onClick={hanldAddNewRow} fullWidth variant="contained">
              Save
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default UserInfo;
