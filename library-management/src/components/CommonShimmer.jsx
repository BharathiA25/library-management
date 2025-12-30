import { Box, Grid, Skeleton } from "@mui/material";

const CommonShimmer = ({
  type = "card",
  count = 6,
  height = 200,
  rowHeight =48,
}) => {
 
 if (type === "cardGrid") {
  return (
    <Grid container spacing={3} justifyContent="center">
      {[...Array(count)].map((_, i) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
          <Box
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            }}
          >
            {/* IMAGE */}
            <Skeleton
              variant="rectangular"
              height={200}
              width={180}
              animation="wave"
            />

            {/* CONTENT */}
            <Box sx={{ p: 2 }}>
              <Skeleton width="80%" height={24} animation="wave" />
              <Skeleton width="60%" height={18} sx={{ mt: 1 }} animation="wave" />
              <Skeleton width="40%" height={16} sx={{ mt: 1 }} animation="wave" />
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
  if (type === "table") {
    return (
      <Box>
        {/* HEADER */}
        <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
          <Skeleton height={40} width="8%" />
          <Skeleton height={40} width="18%" />
          <Skeleton height={40} width="28%" />
          <Skeleton height={40} width="12%" />
          <Skeleton height={40} width="12%" />
          <Skeleton height={40} width="12%" />
        </Box>

        {/* ROWS */}
        {[...Array(count)].map((_, i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              mb: 1,
            }}
          >
            <Skeleton height={rowHeight} width="8%" />
            <Skeleton height={rowHeight} width="18%" />
            <Skeleton height={rowHeight} width="28%" />
            <Skeleton height={rowHeight} width="12%" />
            <Skeleton height={rowHeight} width="12%" />
            <Skeleton height={rowHeight} width="12%" />
          </Box>
        ))}
      </Box>
    );
  }


  return <Skeleton variant="rounded" height={height} />;
};

export default CommonShimmer;
