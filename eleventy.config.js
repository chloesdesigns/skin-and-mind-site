module.exports = function (eleventyConfig) {
  // copy these straight through, untouched
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/uploads");

  // sort helper so newest posts come first
  eleventyConfig.addFilter("newestFirst", function (items) {
    if (!items) return [];
    return [...items].sort(function (a, b) {
      var da = (a.data && a.data.date) ? new Date(a.data.date) : new Date(0);
      var db = (b.data && b.data.date) ? new Date(b.data.date) : new Date(0);
      return db - da;
    });
  });

  // "March 4, 2026"
  eleventyConfig.addFilter("niceDate", function (value) {
    if (!value) return "";
    var d = new Date(value);
    if (isNaN(d)) return "";
    var months = ["January","February","March","April","May","June",
                  "July","August","September","October","November","December"];
    return months[d.getUTCMonth()] + " " + d.getUTCDate() + ", " + d.getUTCFullYear();
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"]
  };
};
