import { Droppable } from "@hello-pangea/dnd";
import { BoardStateInput } from "@vizionboard/validation";
import TaskCard from "../task/TaskCard";
import AddTaskCard from "../task/AddTaskCard";
import { useAppDispatch } from "~/app/hooks";
import { deleteColumn } from "~/features/boardSlice";
import apiClient from "~/api/client";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";

function Column({ column }: { column: BoardStateInput }) {
  const dispatch = useAppDispatch();

  const id = React.useId();
  const buttonId = `${id}-button`;
  const menuId = `${id}-menu`;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const removeColumn = (uuid: string) => {
    const alert = window.confirm(
      "Are you sure you want to delete this column? All tasks within this column will also be deleted.",
    );

    if (!alert) return;

    apiClient(`/api/column/${uuid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch(deleteColumn(uuid));
  };

  return (
    <Droppable droppableId={column.uuid} key={column.uuid}>
      {(provided, _snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="min-w-1/4 py-2 rounded-xl border-2 border-transparent hover:border-blue-200 bg-mauve-100"
        >
          <div className="flex flex-col gap-3 h-full">
            <div className="flex items-center justify-between px-5 py-3 gap-3 h-12">
              <div className="flex items-center font-medium">
                {column.title}
              </div>

              <div className="flex">
                <Button
                  id={buttonId}
                  aria-controls={open ? menuId : undefined}
                  aria-haspopup="true"
                  aria-expanded={open}
                  onClick={handleClick}
                >
                  <MenuIcon className="w-3 h-3 text-gray-500" />
                </Button>
                <Menu
                  id={menuId}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  slotProps={{
                    list: {
                      "aria-labelledby": buttonId,
                    },
                  }}
                >
                  <MenuItem onClick={() => removeColumn(column.uuid)}>
                    Delete
                  </MenuItem>
                </Menu>
                <AddTaskCard columnUUID={column.uuid.toString()} />
              </div>
            </div>
            <hr className="border border-black/10" />
            <div className="px-3">
              {column.tasks &&
                Array.isArray(column.tasks) &&
                column.tasks.map((task, index) => (
                  <TaskCard key={task.uuid} task={task} index={index} />
                ))}
              {provided.placeholder}
            </div>
          </div>
        </div>
      )}
    </Droppable>
  );
}

export default Column;
