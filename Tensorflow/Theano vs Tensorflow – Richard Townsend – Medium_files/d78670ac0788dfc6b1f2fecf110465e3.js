document.write('<link rel="stylesheet" href="https://assets-cdn.github.com/assets/gist-embed-9f0a4ad9c85ca776e669003688baa9d55f9db315562ce4d231d37dab2714c70a.css">')
document.write('<div id=\"gist36216872\" class=\"gist\">\n    <div class=\"gist-file\">\n      <div class=\"gist-data\">\n        <div class=\"js-gist-file-update-container js-task-list-container file-box\">\n  <div id=\"file-theano_embeddings-py\" class=\"file\">\n    \n\n  <div itemprop=\"text\" class=\"blob-wrapper data type-python\">\n      <table class=\"highlight tab-size js-file-line-container\" data-tab-size=\"8\">\n      <tr>\n        <td id=\"file-theano_embeddings-py-L1\" class=\"blob-num js-line-number\" data-line-number=\"1\"><\/td>\n        <td id=\"file-theano_embeddings-py-LC1\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-k\">def<\/span> <span class=\"pl-en\">embeddings_layer<\/span>(<span class=\"pl-smi\">x<\/span>, <span class=\"pl-smi\">Wemb<\/span>, <span class=\"pl-smi\">n_timesteps<\/span>, <span class=\"pl-smi\">n_samples<\/span>, <span class=\"pl-smi\">dim_proj<\/span>):<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-theano_embeddings-py-L2\" class=\"blob-num js-line-number\" data-line-number=\"2\"><\/td>\n        <td id=\"file-theano_embeddings-py-LC2\" class=\"blob-code blob-code-inner js-file-line\">   <span class=\"pl-k\">return<\/span> Wemb[x.flatten()].reshape([n_timesteps, n_samples, dim_proj])<\/td>\n      <\/tr>\n<\/table>\n\n  <\/div>\n\n  <\/div>\n  \n<\/div>\n\n      <\/div>\n      <div class=\"gist-meta\">\n        <a href=\"https://gist.github.com/Sentimentron/d78670ac0788dfc6b1f2fecf110465e3/raw/f3955886b1afa3f7087975cd6600221a67d01184/theano_embeddings.py\" style=\"float:right\">view raw<\/a>\n        <a href=\"https://gist.github.com/Sentimentron/d78670ac0788dfc6b1f2fecf110465e3#file-theano_embeddings-py\">theano_embeddings.py<\/a>\n        hosted with &#10084; by <a href=\"https://github.com\">GitHub<\/a>\n      <\/div>\n    <\/div>\n<\/div>\n')
