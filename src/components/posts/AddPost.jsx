import React from "react";
import { useAddPost } from "../../actions/postFunctions/useAddPost.jsx";
import postDefault from "../../assets/icons/postDefault.png";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ListItemButton from "@mui/material/ListItemButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DialogContent from "@mui/joy/DialogContent";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/joy/Typography";
import Textarea from "@mui/joy/Textarea";
import Divider from "@mui/joy/Divider";
import Button from "@mui/joy/Button";
import Avatar from "@mui/joy/Avatar";
import Alert from "@mui/joy/Alert";
import Modal from "@mui/joy/Modal";
import Box from "@mui/joy/Box";

const AddPost = ({ openSidebar }) => {
  const isMobileScreen = useMediaQuery("(max-width:600px)");
  const characterCount = formik.values.text.length;
  const {
    formik,
    handleUpload,
    handleSubmitPost,
    text,
    file,
    image,
    handleCloseModal,
    handleOpenModal,
    openModal,
    handleExit,
    handleReturn,
    showExitConfirmation,
  } = useAddPost();

  return (
    <>
      {isMobileScreen ? (
        <BottomNavigationAction
          onClick={() => handleOpenModal(true)}
          value="create"
          icon={<AddBoxIcon />}
        ></BottomNavigationAction>
      ) : (
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: openSidebar ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              onClick={() => handleOpenModal(true)}
              sx={{
                minWidth: 0,
                mr: openSidebar ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText
              primary="Create"
              sx={{ opacity: openSidebar ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
      )}
      <Modal keepMounted open={openModal} onClose={() => handleExit()}>
        {isMobileScreen ? (
          <ModalDialog
            sx={{
              padding: "0",
              width: "600px",
              maxWidth: "calc(100% - 100px)",
              maxHeight: "calc(100% - 180px)",
              height: "600px",
              rowGap: "0",
              columnGap: "0",
            }}
          >
            {formik.errors.text && (
              <Box
                sx={{
                  width: "100%",
                  position: "fixed",
                  top: "101%",
                  zIndex: "100",
                }}
              >
                <Alert
                  color="danger"
                  variant="solid"
                  sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  {formik.errors.text}
                </Alert>
              </Box>
            )}
            <Box
              component="form"
              onSubmit={handleSubmitPost}
              style={{ height: "100%" }}
            >
              <DialogTitle sx={{ padding: "0px", height: "43px" }}>
                {file ? (
                  <Box
                    sx={{ width: "100%", textAlign: "right", margin: "auto" }}
                  >
                    <Button
                      variant="plain"
                      type="submit"
                      sx={{
                        marginRight: "15px",
                        padding: "0",
                        height: "24px",
                        minHeight: "unset",
                      }}
                    >
                      Share
                    </Button>
                  </Box>
                ) : (
                  <Box
                    sx={{ width: "100%", textAlign: "left", margin: "auto" }}
                  >
                    <Typography sx={{ marginLeft: "15px" }}>
                      Create new post
                    </Typography>
                  </Box>
                )}
              </DialogTitle>
              <Divider sx={{ overflow: "hidden" }} />
              <DialogContent
                sx={{ height: "calc(100% - 43px)", overflow: "hidden" }}
              >
                {!file && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                    }}
                  >
                    <label
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        padding: "20px 0",
                      }}
                      htmlFor="addImage"
                    >
                      <img
                        style={{ width: "100%", paddingBottom: "20px" }}
                        src={postDefault}
                        alt="Photo and video icon"
                      />
                    </label>
                    <Button component="label">
                      Select from computer
                      <input
                        style={{ display: "none" }}
                        type="file"
                        id="addImage"
                        accept="image/*"
                        onChange={handleUpload}
                      />
                    </Button>
                  </Box>
                )}

                {file && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    {image && (
                      <img
                        style={{
                          width: "100%",
                          height: "50%",
                          objectFit: "cover",
                        }}
                        src={image}
                        alt="previewImage"
                      />
                    )}
                    <Box
                      sx={{
                        width: "100%",
                        height: "50%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          padding: "16px 0 0 0",
                          width: "100%",
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                        }}
                      >
                        <Avatar
                          sx={{
                            width: "28px",
                            height: "28px",
                            marginLeft: "12px",
                          }}
                        />
                        <Typography sx={{ marginLeft: "12px" }}>
                          NamePlaceholder
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          width: "100%",
                          height: "65%",
                          overflowX: "scroll",
                          scrollBehavior: "smooth",
                          scrollbarWidth: "none",
                          "&::-webkit-scrollbar": {
                            display: "none",
                          },
                        }}
                      >
                        <Textarea
                          sx={{
                            minWidth: "100%",
                            height: "fit-content",
                            minHeight: "100%",
                            width: "100%",
                            padding: "16px",
                            "&::before": {
                              display: "none",
                            },
                            "&:focus-within": {
                              outline:
                                "0px solid var(--Textarea-focusedHighlight)",
                              outlineOffset: "0px",
                            },
                          }}
                          autoFocus
                          variant="plain"
                          type="text"
                          name="text"
                          ref={text}
                          placeholder={"Write a caption..."}
                          {...formik.getFieldProps("text")}
                        ></Textarea>
                      </Box>
                    </Box>
                    <Divider />
                    <Box
                      sx={{
                        width: "90%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "16px",
                        position: "fixed",
                        bottom: "0",
                      }}
                    >
                      <SentimentSatisfiedOutlinedIcon />
                      <Typography
                        sx={{ color: characterCount >= 250 ? "red" : "black" }}
                        variant="caption"
                      >
                        {characterCount}/250
                      </Typography>
                    </Box>
                  </Box>
                )}
              </DialogContent>
            </Box>
          </ModalDialog>
        ) : (
          <ModalDialog
            sx={{
              padding: "0",
              height: "500px",
              maxHeight: "calc(100% - 100px)",
            }}
          >
            <Box
              sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
              component="form"
              onSubmit={handleSubmitPost}
            >
              <DialogTitle sx={{ padding: "10px 0px" }}>
                {file ? (
                  <Box sx={{ width: "100%", textAlign: "right" }}>
                    <Button
                      variant="plain"
                      type="submit"
                      sx={{
                        marginRight: "15px",
                        padding: "0",
                        height: "24px",
                        minHeight: "unset",
                      }}
                    >
                      Share
                    </Button>
                  </Box>
                ) : (
                  <Box sx={{ width: "100%", textAlign: "left" }}>
                    <Typography sx={{ marginLeft: "15px" }}>
                      Create new post
                    </Typography>
                  </Box>
                )}
              </DialogTitle>
              <Divider sx={{ overflow: "hidden" }} />
              {!file && (
                <DialogContent sx={{ height: "100%", padding: "20px" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                    }}
                  >
                    <label
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        padding: "20px 0",
                      }}
                      htmlFor="addImage"
                    >
                      <img
                        style={{ width: "100%", paddingBottom: "20px" }}
                        src={postDefault}
                        alt="Photo and video icon"
                      />
                    </label>
                    <Button component="label">
                      Select from computer
                      <input
                        style={{ display: "none" }}
                        type="file"
                        id="addImage"
                        accept="image/*"
                        onChange={handleUpload}
                      />
                    </Button>
                  </Box>
                </DialogContent>
              )}

              {file && (
                <DialogContent
                  sx={{
                    width: "calc(100vw - 88px)",
                    maxWidth: "900px",
                    height: "100%",
                    padding: "0",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "flex-start",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    {image && (
                      <img
                        style={{
                          width: "55%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "0 0 0 8px",
                        }}
                        src={image}
                        alt="previewImage"
                      />
                    )}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        width: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          margin: "18px 16px 18px 16px",
                        }}
                      >
                        <Avatar
                          sx={{
                            width: "28px",
                            height: "28px",
                          }}
                        />
                        <Typography
                          sx={{
                            marginLeft: "12px",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                        >
                          NamePlaceholder
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          width: "100%",
                          height: "50%",
                          paddingLeft: "5px",
                          overflowX: "scroll",
                          scrollBehavior: "smooth",
                          scrollbarWidth: "none",
                          "&::-webkit-scrollbar": {
                            display: "none",
                          },
                        }}
                      >
                        <Textarea
                          sx={{
                            overflowX: "scroll",
                            scrollBehavior: "smooth",
                            scrollbarWidth: "none",
                            "&::-webkit-scrollbar": {
                              display: "none",
                            },
                            minHeight: "100%",
                            height: "fit-content",
                            width: "100%",
                            padding: "0 16px",
                            fontSize: "16px",
                            "&::before": {
                              display: "none",
                            },
                            "&:focus-within": {
                              outline:
                                "0px solid var(--Textarea-focusedHighlight)",
                              outlineOffset: "0px",
                            },
                          }}
                          autoFocus
                          variant="plain"
                          type="text"
                          name="text"
                          ref={text}
                          placeholder={"Write a caption..."}
                          {...formik.getFieldProps("text")}
                        ></Textarea>

                        {formik.errors.text && (
                          <Box
                            sx={{
                              borderRadius: "0px 0px 18px 18px",
                              position: "fixed",
                              bottom: "0",
                              width: "40%",
                              backgroundColor: "#fff",
                              padding: "15px",
                            }}
                          >
                            <Typography color="danger">
                              {formik.errors.text}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "16px",
                        }}
                      >
                        <SentimentSatisfiedOutlinedIcon />
                        <Typography
                          sx={{
                            color: characterCount >= 250 ? "red" : "black",
                          }}
                          variant="caption"
                        >
                          {characterCount}/250
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </DialogContent>
              )}
            </Box>
          </ModalDialog>
        )}
      </Modal>
      <Modal open={showExitConfirmation}>
        <ModalDialog
          sx={{
            padding: 0,
            width: "calc(100vw - 88px)",
            maxWidth: "400px",
            minWidth: "260px",
          }}
        >
          {showExitConfirmation && openModal && (
            <Box>
              <Box sx={{ margin: "32px 32px 16px 32px" }}>
                <Typography
                  level="title-lg"
                  sx={{ fontWeight: "700", textAlign: "center" }}
                >
                  Discard post?
                </Typography>
                <Typography
                  sx={{
                    color: "#737373",
                    fontSize: "14px",
                    fontWeight: "400",
                    textAlign: "center",
                  }}
                >
                  If you leave, your edits won't be saved.
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Divider sx={{ marginTop: "16px" }} />
                <Button
                  color="none"
                  sx={{
                    borderRadius: 0,
                    minHeight: "48px",
                    padding: "4px 8px",
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "red",
                  }}
                  onClick={handleCloseModal}
                >
                  Discard
                </Button>
                <Divider />
                <Button
                  color="none"
                  sx={{
                    borderRadius: 0,
                    minHeight: "48px",
                    padding: "4px 8px",
                    fontSize: "14px",
                    fontWeight: "700",
                  }}
                  onClick={handleReturn}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          )}
        </ModalDialog>
      </Modal>
    </>
  );
};

export default AddPost;
