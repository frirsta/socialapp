import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import SendOutlined from "@mui/icons-material/SendOutlined";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Face from "@mui/icons-material/Face";
import Avatar from "@mui/joy/Avatar";
import Input from "@mui/joy/Input";
import Card from "@mui/joy/Card";
import Link from "@mui/joy/Link";
import Box from "@mui/joy/Box";
import moment from "moment";

const Post = ({ profilePicture, username, uid, image, text, timestamp }) => {
  const timeAgo = moment.unix(timestamp.seconds).fromNow();
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleTextExpansion = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <Card
      variant="outlined"
      sx={{
        overflow: "hidden",
        margin: "5px auto",
        width: "500px",
        maxWidth: "90vw",
        "--Card-radius": (theme) => theme.vars.radius.xs,
      }}
    >
      <CardContent
        orientation="horizontal"
        sx={{ alignItems: "center", gap: 1 }}
      >
        <Link component={RouterLink} to={`profile/${uid}`}>
          <Box
            sx={{
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                m: "-2px",
                borderRadius: "50%",
                background:
                  "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
              },
            }}
          >
            <Avatar
              size="sm"
              src={profilePicture}
              sx={{
                p: 0.5,
                border: "2px solid",
                borderColor: "background.body",
              }}
            />
          </Box>
        </Link>
        <Typography fontWeight="lg">{username}</Typography>
        <IconButton
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ ml: "auto" }}
        >
          <MoreHoriz />
        </IconButton>
      </CardContent>
      <CardOverflow>
        <AspectRatio>
          <img src={image} alt={text} loading="lazy" />
        </AspectRatio>
      </CardOverflow>
      <CardContent
        orientation="horizontal"
        sx={{ alignItems: "center", mx: -1 }}
      >
        <Box sx={{ width: 0, display: "flex", gap: 0.5 }}>
          <IconButton variant="plain" color="neutral" size="sm">
            <FavoriteBorder />
          </IconButton>
          <IconButton variant="plain" color="neutral" size="sm">
            <ModeCommentOutlined />
          </IconButton>
          <IconButton variant="plain" color="neutral" size="sm">
            <SendOutlined />
          </IconButton>
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 0.5, mx: "auto" }}
        >
          {[...Array(5)].map((_, index) => (
            <Box
              key={index}
              sx={{
                borderRadius: "50%",
                width: `max(${6 - index}px, 3px)`,
                height: `max(${6 - index}px, 3px)`,
                bgcolor: index === 0 ? "primary.solidBg" : "background.level3",
              }}
            />
          ))}
        </Box>
        <Box sx={{ width: 0, display: "flex", flexDirection: "row-reverse" }}>
          <IconButton variant="plain" color="neutral" size="sm">
            <BookmarkBorderRoundedIcon />
          </IconButton>
        </Box>
      </CardContent>
      <CardContent>
        <Link
          component={RouterLink}
          underline="none"
          fontSize="sm"
          fontWeight="lg"
          textColor="text.primary"
        >
          8.1M Likes
        </Link>
        <Typography fontSize="sm">
          <Link
            component={RouterLink}
            to={`profile/${uid}`}
            color="neutral"
            fontWeight="lg"
            textColor="text.primary"
          >
            {username}
          </Link>
          {"  "}
          {isExpanded ? text : text?.substring(0, 100)}
          {!isExpanded && text?.length > 100 && (
            <Link
              component="button"
              underline="none"
              fontSize="sm"
              startDecorator="…"
              sx={{ color: "text.tertiary" }}
              onClick={toggleTextExpansion}
            >
              more
            </Link>
          )}
        </Typography>

        <Link
          component={RouterLink}
          underline="none"
          fontSize="10px"
          sx={{ color: "text.tertiary", my: 0.5 }}
        >
          {timeAgo}
        </Link>
      </CardContent>
      <CardContent orientation="horizontal" sx={{ gap: 1 }}>
        <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
          <Face />
        </IconButton>
        <Input
          variant="plain"
          size="sm"
          placeholder="Add a comment…"
          sx={{ flex: 1, px: 0, "--Input-focusedThickness": "0px" }}
        />
        <Link disabled underline="none" role="button">
          Post
        </Link>
      </CardContent>
    </Card>
  );
};
export default Post;
