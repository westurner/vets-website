<<<<<<< HEAD
#!/bin/sh -e
# via http://stackoverflow.com/questions/1964470

OS=${OS:-`uname`}
old_rev="$1"
new_rev="$2"

get_file_rev() {
    git rev-list -n 1 "$new_rev" "$1"
}

if   [ "$OS" = 'Linux' ]
then
    update_file_timestamp() {
        file_time=`git show --pretty=format:%ai --abbrev-commit "$(get_file_rev "$1")" | head -n 1`
        touch -d "$file_time" "$1"
    }
elif [ "$OS" = 'FreeBSD' ]
then
    update_file_timestamp() {
        file_time=`date -r "$(git show --pretty=format:%at --abbrev-commit "$(get_file_rev "$1")" | head -n 1)" '+%Y%m%d%H%M.%S'`
        touch -h -t "$file_time" "$1"
    }
else
    echo "timestamp changing not implemented" >&2
    exit 1
fi

IFS=`printf '\t\n\t'`

git ls-files | while read -r file
do
    update_file_timestamp "$file"
done
=======
#!/bin/sh
# via http://stackoverflow.com/questions/1964470

if [ "$(uname)" = 'Darwin' ] ||
   [ "$(uname)" = 'FreeBSD' ]; then
   gittouch() {
      touch -ch -t "$(date -r "$(git log -1 --format=%ct "$1")" '+%Y%m%d%H%M.%S')" "$1"
   }
else
   gittouch() {
      touch -ch -d "$(git log -1 --format=%ci "$1")" "$1"
   }
fi

git ls-files |
   while IFS= read -r file; do
      gittouch "$file"
   done
>>>>>>> 55a9d16662f63fa592edd7a60cdd7c3707e70929
