document.write('<link rel="stylesheet" href="https://assets-cdn.github.com/assets/gist-embed-9f0a4ad9c85ca776e669003688baa9d55f9db315562ce4d231d37dab2714c70a.css">')
document.write('<div id=\"gist36216715\" class=\"gist\">\n    <div class=\"gist-file\">\n      <div class=\"gist-data\">\n        <div class=\"js-gist-file-update-container js-task-list-container file-box\">\n  <div id=\"file-optimization_faceoff-py\" class=\"file\">\n    \n\n  <div itemprop=\"text\" class=\"blob-wrapper data type-python\">\n      <table class=\"highlight tab-size js-file-line-container\" data-tab-size=\"8\">\n      <tr>\n        <td id=\"file-optimization_faceoff-py-L1\" class=\"blob-num js-line-number\" data-line-number=\"1\"><\/td>\n        <td id=\"file-optimization_faceoff-py-LC1\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-c\"><span class=\"pl-c\">#<\/span> Tensorflow<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-optimization_faceoff-py-L2\" class=\"blob-num js-line-number\" data-line-number=\"2\"><\/td>\n        <td id=\"file-optimization_faceoff-py-LC2\" class=\"blob-code blob-code-inner js-file-line\">loss <span class=\"pl-k\">=<\/span> tf.reduce_mean(tf.square(y <span class=\"pl-k\">-<\/span> y_data)) <span class=\"pl-c\"><span class=\"pl-c\">#<\/span> (1)<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-optimization_faceoff-py-L3\" class=\"blob-num js-line-number\" data-line-number=\"3\"><\/td>\n        <td id=\"file-optimization_faceoff-py-LC3\" class=\"blob-code blob-code-inner js-file-line\">optimizer <span class=\"pl-k\">=<\/span> tf.train.GradientDescentOptimizer(<span class=\"pl-c1\">0.5<\/span>) <span class=\"pl-c\"><span class=\"pl-c\">#<\/span> (2)<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-optimization_faceoff-py-L4\" class=\"blob-num js-line-number\" data-line-number=\"4\"><\/td>\n        <td id=\"file-optimization_faceoff-py-LC4\" class=\"blob-code blob-code-inner js-file-line\">train <span class=\"pl-k\">=<\/span> optimizer.minimize(loss) <span class=\"pl-c\"><span class=\"pl-c\">#<\/span> (3)<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-optimization_faceoff-py-L5\" class=\"blob-num js-line-number\" data-line-number=\"5\"><\/td>\n        <td id=\"file-optimization_faceoff-py-LC5\" class=\"blob-code blob-code-inner js-file-line\">\n<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-optimization_faceoff-py-L6\" class=\"blob-num js-line-number\" data-line-number=\"6\"><\/td>\n        <td id=\"file-optimization_faceoff-py-LC6\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-c\"><span class=\"pl-c\">#<\/span> Theano<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-optimization_faceoff-py-L7\" class=\"blob-num js-line-number\" data-line-number=\"7\"><\/td>\n        <td id=\"file-optimization_faceoff-py-LC7\" class=\"blob-code blob-code-inner js-file-line\">cost <span class=\"pl-k\">=<\/span> T.mean(T.sqr(y <span class=\"pl-k\">-<\/span> Y)) <span class=\"pl-c\"><span class=\"pl-c\">#<\/span> (1)<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-optimization_faceoff-py-L8\" class=\"blob-num js-line-number\" data-line-number=\"8\"><\/td>\n        <td id=\"file-optimization_faceoff-py-LC8\" class=\"blob-code blob-code-inner js-file-line\">gradientW <span class=\"pl-k\">=<\/span> T.grad(<span class=\"pl-v\">cost<\/span><span class=\"pl-k\">=<\/span>cost, <span class=\"pl-v\">wrt<\/span><span class=\"pl-k\">=<\/span>W) <span class=\"pl-c\"><span class=\"pl-c\">#<\/span> (2)<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-optimization_faceoff-py-L9\" class=\"blob-num js-line-number\" data-line-number=\"9\"><\/td>\n        <td id=\"file-optimization_faceoff-py-LC9\" class=\"blob-code blob-code-inner js-file-line\">gradientB <span class=\"pl-k\">=<\/span> T.grad(<span class=\"pl-v\">cost<\/span><span class=\"pl-k\">=<\/span>cost, <span class=\"pl-v\">wrt<\/span><span class=\"pl-k\">=<\/span>b) <span class=\"pl-c\"><span class=\"pl-c\">#<\/span> (2)<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-optimization_faceoff-py-L10\" class=\"blob-num js-line-number\" data-line-number=\"10\"><\/td>\n        <td id=\"file-optimization_faceoff-py-LC10\" class=\"blob-code blob-code-inner js-file-line\">updates <span class=\"pl-k\">=<\/span> [[W, W <span class=\"pl-k\">-<\/span> gradientW <span class=\"pl-k\">*<\/span> <span class=\"pl-c1\">0.5<\/span>], [b, b <span class=\"pl-k\">-<\/span> gradientB <span class=\"pl-k\">*<\/span> <span class=\"pl-c1\">0.5<\/span>]] <span class=\"pl-c\"><span class=\"pl-c\">#<\/span> (2)<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-optimization_faceoff-py-L11\" class=\"blob-num js-line-number\" data-line-number=\"11\"><\/td>\n        <td id=\"file-optimization_faceoff-py-LC11\" class=\"blob-code blob-code-inner js-file-line\">train <span class=\"pl-k\">=<\/span> theano.function(<span class=\"pl-v\">inputs<\/span><span class=\"pl-k\">=<\/span>[X, Y], <span class=\"pl-v\">outputs<\/span><span class=\"pl-k\">=<\/span>cost, <span class=\"pl-v\">updates<\/span><span class=\"pl-k\">=<\/span>updates, <span class=\"pl-v\">allow_input_downcast<\/span><span class=\"pl-k\">=<\/span><span class=\"pl-c1\">True<\/span>) <span class=\"pl-c\"><span class=\"pl-c\">#<\/span> (3)<\/span><\/td>\n      <\/tr>\n<\/table>\n\n  <\/div>\n\n  <\/div>\n  \n<\/div>\n\n      <\/div>\n      <div class=\"gist-meta\">\n        <a href=\"https://gist.github.com/Sentimentron/e503c68abe7c9d0a40d9775019ed8bed/raw/8fac0e6620981a6207fdc68941b8b793b9474941/optimization_faceoff.py\" style=\"float:right\">view raw<\/a>\n        <a href=\"https://gist.github.com/Sentimentron/e503c68abe7c9d0a40d9775019ed8bed#file-optimization_faceoff-py\">optimization_faceoff.py<\/a>\n        hosted with &#10084; by <a href=\"https://github.com\">GitHub<\/a>\n      <\/div>\n    <\/div>\n<\/div>\n')
